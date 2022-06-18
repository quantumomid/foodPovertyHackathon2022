// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/recipient', async(req, res) => {
    // Grab the text parameter.
    const recipientCode = req.query.text;

    const result = await admin.firestore().collection('recipient')
        .where('id','==', recipientCode)
        .get();

    // Send back a message that we've successfully written the message
    res.json( result.docs[0].data());
    res.end("Received GET request!");
});

app.post('/recipient', async(req, res) => {
    // Grab the text parameter.
    const original = req.body;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('recipient').add(original);
    // Send back a message that we've successfully written the message
    res.json({result: `Recipient with ID: ${writeResult.id} created.`});
    res.end("Received POST request!");
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