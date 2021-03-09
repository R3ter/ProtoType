import {checkToken} from './../../../methods/Tokens.js'
import admin from 'firebase-admin'
const sendMessageResolver=async (parent,{toId},{prisma,req})=>{
    const {full_name} = checkToken({token:req.headers.token})
    const db = admin.firestore()
    try{
        const {token,deviceToken} = await db.collection("usersTokens").doc(toId).get()
        .then((e)=>e.data()).catch(()=>null)
        
         checkToken({token})
        
        await admin.messaging().sendToDevice(
           deviceToken,
            {
            notification: {
                title: `${full_name} send you a message`,
                body : 'check it out'
            }
        }).then((e)=>{
            console.log(e)
        }).catch((e)=>{console.log(e)})
    }catch(e){}
}
export default sendMessageResolver