// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { base64encode } = require('nodejs-base64');
const app = express();

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
const {error} = require("firebase-functions/logger");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

function generateQrCode(united_nations_id) {
    // Concat the UN ID and a current timestamp, Base64 encode it all
    const concatString = `${united_nations_id}/${new Date().toISOString()}`;
    return base64encode(concatString);
}

async function getToken(request) {
    if (!request.headers.authorization) {
        throw new Error("invalid or missing authorization");
    }

    const token = request.headers.authorization.replace(/^Bearer\s/, '');

    return token;
}

async function verifyToken(request) {
    try {
        const token = await getToken(request);

        if (!token) {
            throw new Error("invalid or missing auth");
        }

        const payload = await admin.auth().verifyIdToken(token);
        return payload !== null;

    } catch (err) {
        throw new Error("invalid or missing auth");
    }
}

async function getByDocId(collectionName, docId, res) {
   await db.collection(collectionName)
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

async function getByField(collectionName, fieldName, fieldId, res) {
    await db.collection(collectionName)
        .where(fieldName, '==', fieldId)
        .get()
        .then(querySnapshot => {
            if (!querySnapshot.docs || !querySnapshot.docs.length > 0) {
                throw new Error(collectionName.concat(' not found'));
            }
            res.status(200).json(querySnapshot.docs.map(doc => doc.data()))
        })
        .catch(error => res.status(400).send({result : error.message}));
};

async function getAll(collectionName, res){
    await db.collection(collectionName)
        .get()
        .then(querySnapshot => {
            if (!querySnapshot.docs || !querySnapshot.docs.length > 0) {
                throw new Error(collectionName.concat(' not found'));
            }
            res.status(200).json(querySnapshot.docs.map(doc => doc.data()))
        })
        .catch(error => res.status(400).send({result : error.message}));
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

async function saveDocRecipient(docId, doc, res){
    const barcode = generateQrCode(docId);
    const querySnapshot = await db.collection('recipient')
        .doc(docId)
        .set({...doc, barcode});

    if(!querySnapshot) {
        throw new Error('Error saving recipient in firestore');
    }

    res.status(201).json({
        result: `recipient with ID: ${querySnapshot} created.`,
        barcode
    });
}

app.get('/recipient/:recipientCode', async(req, res) => {
    await verifyToken(req).catch((error) => {
        res.status(401).send({result: error.message});
        throw new Error();
    });

    // Grab the text parameter.
    const docId = req.params.recipientCode;
    await getByDocId('recipient', docId, res);
});

app.get('/recipient', async(req, res) => {
    await verifyToken(req).catch((error) => {
        res.status(401).send({result: error.message});
        throw new Error();
    });

    // Grab the barcode parameter.
    const barcode = req.query.barcode;
    const category = req.query.category;
    const name = req.query.name;
    if (name) {
        await getByField('recipient','name', name, res);
    } else if (barcode) {
        await getByField('recipient','barcode', barcode, res);
    } else if (category) {
        const Category = {
            FAMILY: "FAMILY",
            INDIVIDUAL: "INDIVIDUAL"
        };
        if (category in Category){
            await getByField('recipient','category', category, res);
        } else {
            res.status(400).end("Invalid Category!");
        }
    } else {
         await getAll('recipient', res);
    }
});

app.post('/recipient', async(req, res) => {
    await verifyToken(req).catch((error) => {
        res.status(401).send({result: error.message});
        throw new Error();
    });

    // Grab the text parameter.
    const original = req.body;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const recipientCode = req.body.united_nations_id;

    try {
        await checkIfDuplicateDoc('recipient', 'united_nations_id', recipientCode);
        await saveDocRecipient(recipientCode, original, res);
    } catch (e) {
        res.status(400).send({result : e.message});
    }
});


app.get('/charity/:charityCode', async(req, res) => {
    await verifyToken(req).catch((error) => {
        res.status(401).send({result: error.message});
        throw new Error();
    });

    // Grab the text parameter.
    const docId = req.params.charityCode;
    await getByDocId('charity', docId, res);
});

app.get('/charity', async(req, res) => {
    await getAll('charity', res);
});

app.post('/charity', async(req, res) => {
    await verifyToken(req).catch((error) => {
        res.status(401).send({result: error.message});
        throw new Error();
    });

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

app.post('/distributions/:united_nations_id', async(req,res) => {
    await verifyToken(req).catch((error) => {
        res.status(401).send({result: error.message});
        throw new Error();
    });

    // Check this UN ID is a valid one
    const recipientId = req.params.united_nations_id;
    const recipientExists = await db.collection('recipient')
        .where('united_nations_id','==', recipientId)
        .get();
    
    if (recipientExists.docs.length == 0) {
        res.status(400);
        res.json({result: "Recipient of this distribution not found"});
        return;
    }

    const distribution_id = `${uuidv4()}`;
    const timestamp = `${new Date().toISOString()}`;

    // Check if distribution array exists for this recipient
    const readResult = await db.collection('distributions').doc(recipientId).get();

    if (readResult.exists) {
        const updateResult = await db.collection('distributions').doc(recipientId).update({
            distributions: [
                ...readResult.data().distributions,
                {
                    ...req.body,
                    distribution_id,
                    timestamp
                }
            ]
        });

        res.json({ 
            distribution_id,
            timestamp}
        );

    } else {
        const writeResult = await db.collection('distributions').doc(recipientId).set({
            distributions: [{
                ...req.body,
                distribution_id,
                timestamp
            }]
        });

        res.json({ 
            distribution_id,
            timestamp}
        );
    }
});

app.get('/distributions/:united_nations_id', async(req, res) => {
    await verifyToken(req).catch((error) => {
        res.status(401).send({result: error.message});
        throw new Error();
    });

    const united_nations_id = req.params.united_nations_id;

    const readResult = await db.collection('distributions').doc(united_nations_id).get();

    if (!readResult.exists) {
        res.status(404);
        res.json({result: `Distribution history for recipient ID: ${united_nations_id} not found.`});
    } else {
        res.json(readResult.data());
    }
    
});

app.get('/distributions', async(req, res) => {
    await verifyToken(req).catch((error) => {
        res.status(401).send({result: error.message});
        throw new Error();
    });
    
    await getAll('distributions', res);
});


// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
