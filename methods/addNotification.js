import admin from 'firebase-admin'
import moment from 'moment'
const {now}=moment
import { checkToken } from './Tokens.js'
const db = admin.firestore()



export const storeNotification= async({
    type,toId,fromId,full_name,
    title,body,fromImage=""
})=>{
    const content={
        title,body
    }
    await db.collection("Notifications").add({
        toId,
        type,createdAt:now(),
        fromId,
        content,
        fromImage,
        from_full_name:full_name,
        isView:false
    })
    const {deviceToken,token} = getUserToken(toId)
    if(!token){return null}
    const {id} = await checkToken({token:token})
    if(!id){return}

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
    }).catch((e)=>{return false})
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