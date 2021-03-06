import admin from 'firebase-admin'
import moment from 'moment'
const {now}=moment
import { checkToken } from './Tokens.js'
const db = admin.firestore()



export const storeNotification= async({
    type,sendUserId,fromId
})=>{
    const {deviceToken,token} = getUserToken(sendUserId)
    const {id,full_name} = await checkToken({token:token}).catch((e)=>{
        return null
    })
    if(!id){
        return
    }
    const content={
        title:`You have a new book by ${full_name}`,
        body:"Accept or Reject it now"
    }
    await db.collection("Notifications").add({
        userId:sendUserId,
        type,createdAt:now(),
        fromId,
        content,
        isView:false
    })
    if(type=="booking"){
        sendNotification({
            ...content,
            token:deviceToken
        })
    }
}
export const getUserToken = async(userId)=>{
    return await db.collection("usersTokens").doc(userId).get()
    .then((e)=>e.data().token).catch(()=>null)
}
export const sendNotification=async ({
    title,body,token
})=>{
    await admin.messaging().sendToDevice(
        token,
        {
        notification: {
          title,body
        }
    }).catch((e)=>{console.log(e)})
}

export const saveTokenInFirebase=({token,deviceToken})=>{
    if(deviceToken&&token){
        try{
            const {full_name,id}=checkToken({token})
            const db = admin.firestore()
            db.collection("usersTokens").doc(id).set({
                id:id,
                full_name,
                token,
                deviceToken,
                createdAt:moment(now()).format("yyyy-MM-DD[T]HH:mm:ss[Z]")
            })   
        }catch(e){
            return null
        }
        
    }
}