require("dotenv").config(); // this is also added due to the changes in the serviceAccountKey.json 
const admin = require("firebase-admin");

// const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert({ // instead of the serviceAccount the json is added here 
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
})
});

module.exports = admin;
