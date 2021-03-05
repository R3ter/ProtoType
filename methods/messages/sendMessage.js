import admin from 'firebase-admin'
import moment from 'moment'
const {now}=moment

import firebase from 'firebase'
import data from './../firebaseData.js'
import { Pay } from '../payment.js'
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


const sendMessage=async(fromId,toId,message,isImage=false,attachments=[],full_name)=>{
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
    await admin.messaging().sendToDevice(
        "f3hyD6BIR8e_w-lKxrdOMx:APA91bFVMok0ZOWxtw7vMFqTxgTWUaM1GsIDBeKocevhdlcGIafSzo8r7iQGUMA6VmpAW52HouWXnL31mSe8okVsv-vdBwr2DqzFk41yRNNIU_yba6p0Rp0Hxa3OuT1Wdpk3eLeE_1wo"
        ,
        {
        notification: {
            title: 'wesal??',
            body : '????'
        }
    }).then((e)=>{
        console.log(e)
    }).catch((e)=>{console.log(e)})
    
    // db.collection("usersTokens").doc(toId).get().then((e)=>{
    //     // admin.messaging().send("dawsdwadwasda")
    //     admin.messaging().sendToDevice(e.data().token,{
    //         data:{
    //             MyKey:"waleed is awesome!",
    //             message,
    //             name:full_name
    //         }
    //     })
    // }).catch((e)=>{
    //     console.log(e)
    // })
    // // admin.messaging().sendToDevice()
    // Pay()
}
const readMessage=(userId)=>{

}

export {sendMessage,readMessage}