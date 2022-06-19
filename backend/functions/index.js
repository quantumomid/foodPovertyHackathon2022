// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
const {error} = require("firebase-functions/logger");
admin.initializeApp();

const db = admin.firestore();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

function getByDocId(collectionName, docId, res) {
   db.collection(collectionName)
        .doc(docId)
        .get()
        .then(querySnapshot => {
            if (!querySnapshot || !querySnapshot.data()) {
                throw new Error(collectionName.concat(' not found'));
            }
            res.status(200).json(querySnapshot.data())
        })
        .catch(error => res.status(400).send({result : error.message}));
}

function getByField(collectionName, fieldName, fieldId, res) {
    db.collection(collectionName)
        .where(fieldName, '==', fieldId)
        .get()
        .then(querySnapshot => {
            if (!querySnapshot || !querySnapshot.data()) {
                throw new Error(collectionName.concat(' not found'));
            }
            res.status(200).json(querySnapshot.data())
        })
        .catch(error => res.status(400).send({result : error.message}));
};

function getAll(collectionName, res){
    db.collection(collectionName)
        .get()
        .then(querySnapshot => {
            if (!querySnapshot.docs || !querySnapshot.docs.length > 0) {
                throw new Error(collectionName.concat('not found'));
            }
            res.status(200).json(querySnapshot.docs.map(doc => doc.data()))
        })
        .catch(error => res.status(400).send(error.message));
}

// Helper Functions
async function checkIfDuplicateDoc(collectionName, fieldName, fieldValue) {
    const querySnapshot = await db.collection(collectionName)
        .where(fieldName,'==', fieldValue)
        .get();

    if (querySnapshot.docs && querySnapshot.docs.length > 0){
        throw new Error(collectionName + ' with ID: ' + fieldValue + ' already exists');
    }
}

async function saveDoc(collectionName, docId, doc, res){
    const querySnapshot = await db.collection(collectionName)
        .doc(docId)
        .set(doc);

    if(!querySnapshot) {
        throw new Error('Error saving' + collectionName + 'in firestore');
    }

    res.status(201).json({result : collectionName + ` with ID: ${querySnapshot} created.`});
}


app.get('/recipient/:recipientCode', (req, res) => {
    // Grab the text parameter.
    const docId = req.params.recipientCode;
    getByDocId('recipient', docId, res);
});

app.get('/recipient', async(req, res) => {
    // Grab the barcode parameter.
    const barcode = req.query.barcode;
    const category = req.query.category;
    if (barcode) {
        getByField('recipient','barcode', barcode, res);
    } else if (category) {
        const Category = {
            FAMILY: "FAMILY",
            INDIVIDUAL: "INDIVIDUAL"
        };
        if (category in Category){
            getByField('recipient','category', category, res);
        } else {
            res.status(400).end("Invalid Category!");
        }
    } else {
         getAll('recipient', res);
    }
});

app.post('/recipient', async(req, res) => {
    // Grab the text parameter.
    const original = req.body;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const recipientCode = req.body.united_nations_id;

    try {
        await checkIfDuplicateDoc('recipient', 'united_nations_id', recipientCode);
        await saveDoc('recipient', recipientCode, original, res);
    } catch (e) {
        res.status(400).send({result : e.message});
    }
});


app.get('/charity/:charityCode', (req, res) => {
    // Grab the text parameter.
    const docId = req.params.charityCode;
    getByDocId('charity', docId, res);
});

app.get('/charity', async(req, res) => {
    getAll('charity', res);
});

app.post('/charity', async(req, res) => {
    // Grab the charityCode parameter.
    const original = req.body;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const charityCode = req.body.charity_id;

    try {
        await checkIfDuplicateDoc('charity', 'charity_id', charityCode);
        await saveDoc('charity', charityCode, original, res);
    } catch (e) {
        res.status(400).send({result : e.message});
    }
});

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);