import admin from 'firebase-admin'
import frirebaseData from './../firebaseData.js'

admin.initializeApp({
    databaseURL: 'https://school-92b2c-default-rtdb.europe-west1.firebasedatabase.app/',
    credential:admin.credential.cert(frirebaseData)
})

const sendMessage=async(fromId,toId,message)=>{
    const db = admin.firestore()
    await db.collection("chat").doc(fromId).collection(toId).add({
        from:fromId,
        to:toId,
        message,
        isView:false,
        createdAt:new Date()
    })
}
const readMessage=(userId)=>{

}

export {sendMessage,readMessage}