import admin from 'firebase-admin'
import { now } from '../time.js'
import frirebaseData from './../firebaseData.js'

admin.initializeApp({
    databaseURL: 'https://school-92b2c-default-rtdb.europe-west1.firebasedatabase.app/',
    credential:admin.credential.cert(frirebaseData)
})
var condition = "'stock-GOOG' in topics || 'industry-tech' in topics";
var message = {
    notification: {
      title: '$FooCorp up 1.43% on the day',
      body: '$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.'
    },
    condition: condition
  };
admin.messaging().send(message).then((e)=>{
    console.log(e)
})
const sendMessage=async(fromId,toId,message)=>{
    const db = admin.firestore()
    await db.collection("chat").doc(fromId).collection(toId).add({
        from:fromId,
        to:toId,
        message,
        isView:false,
        createdAt:now()
    })
      
    
}
const readMessage=(userId)=>{

}

export {sendMessage,readMessage}