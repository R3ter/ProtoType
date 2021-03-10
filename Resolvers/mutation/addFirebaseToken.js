import admin from 'firebase-admin'
import { checkToken } from '../../methods/Tokens.js'
const addfirebaseToken=async(parent,{deviceToken,Token})=>{
    const {full_name,id}=checkToken({token:Token})
    await admin.messaging().sendToDevice(
       deviceToken,
        {
        notification: {
            title: 'you have successfully signed in',
            body : 'welcome'
        }
    }).catch((e)=>{})

    await admin.firestore().collection("usersToken")
    .doc(id).set({
        deviceToken,
        Token,
        userId:id,
        full_name
    })
    return true
}

export default addfirebaseToken