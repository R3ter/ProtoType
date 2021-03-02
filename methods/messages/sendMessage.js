import admin from 'firebase-admin'
import moment from 'moment'
const {now}=moment
import frirebaseData from './../firebaseData.js'
import firebase from 'firebase'

// firebase.initializeApp({
//     apiKey: "AIzaSyDdojQ8np88pGmLd1rC7B7lxEC8RdnWpZc",
//   authDomain: "school-92b2c.firebaseapp.com",
//   databaseURL: "https://school-92b2c-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "school-92b2c",
//   storageBucket: "school-92b2c.appspot.com",
//   messagingSenderId: "1046635118653",
//   appId: "1:1046635118653:web:8e709079978ded68b4aa54",
//   measurementId: "G-4EX63WVC0M"
// })
admin.initializeApp({
    databaseURL: 'https://school-92b2c-default-rtdb.europe-west1.firebasedatabase.app/',
    credential:admin.credential.cert(frirebaseData)
})

const sendMessage=async(fromId,toId,message,isImage=false,attachments)=>{
    const db = admin.firestore()
    await db.collection("Conversation").doc(fromId).collection(toId).add({
        from:fromId,
        to:toId,
        isImage,
        attachments,
        message,
        isView:false,
        createdAt:now()
    })
    
}
const readMessage=(userId)=>{

}

export {sendMessage,readMessage}