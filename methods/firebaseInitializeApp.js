import admin from 'firebase-admin'
import frirebaseData from './firebaseData.js'
admin.initializeApp({
    databaseURL: 'https://school-92b2c-default-rtdb.europe-west1.firebasedatabase.app/',
    credential:admin.credential.cert(frirebaseData)
})
