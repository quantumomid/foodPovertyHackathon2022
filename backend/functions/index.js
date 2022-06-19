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

app.get('/recipient/:recipientCode', async(req, res) => {
    // Grab the text parameter.
    const recipientCode = req.params.recipientCode;

    const result = await db.collection('recipient')
        .where('united_nations_id','==', recipientCode)
        .get();

    // Send back a message that we've successfully written the message
    res.json(result.docs[0].data());
});

app.get('/recipient', async(req, res) => {
    // Grab the barcode parameter.
    const barcode = req.query.barcode;
    const category = req.query.category;

    let querySnapshot;

    if (barcode) {
         querySnapshot = await db.collection('recipient')
            .where('barcode', '==', barcode)
            .get();
    } else if (category) {

        const Category = {
            FAMILY: "FAMILY",
            INDIVIDUAL: "INDIVIDUAL"
        };

        if (category in Category){
            querySnapshot = await db.collection('recipient')
                .where('category', '==', category)
                .get();
        } else {
            res.status(400).end("Invalid Category!");
            return;
        }
    } else {
         querySnapshot = await db.collection('recipient').get();
    }

    // Send back a message that we've successfully written the message
    const result = querySnapshot.docs.map(doc => doc.data());
    res.json(result);
});

app.post('/recipient', async(req, res) => {
    // Grab the text parameter.
    const original = req.body;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const recipientCode = req.body.united_nations_id;

    const result = await db.collection('recipient')
        .where('united_nations_id','==', recipientCode)
        .get();

    if (result.docs.length > 0){
        res.status(400)
            .json({result: `Recipient with ID: ${recipientCode} already exists`});
    } else {
        const writeResult = await db.collection('recipient').doc(recipientCode).set(original);
        // Send back a message that we've successfully written the message
        //TODO get id from write result
        res.json({result: `Recipient with ID: ${writeResult} created.`});
    }
});

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

/* exports.createRecipient = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.body;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('recipient').add(original);
    // Send back a message that we've successfully written the message
    res.json({result: `Recipient with ID: ${writeResult.id} created.`});
});


exports.getRecipient = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const recipientCode = req.query.text;

    const result = await admin.firestore().collection('recipient')
        .where('id','==', recipientCode)
        .get();

    // Send back a message that we've successfully written the message
    res.json( result.docs[0].data());
}); */