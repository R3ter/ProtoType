import admin from 'firebase-admin'
import moment from 'moment'
const {now}=moment
import { checkToken } from './Tokens.js'
const db = admin.firestore()



export const storeNotification= async({
    type,toId,fromId,
    title,body,fromImage="",
    from_full_name,to_full_name,
    elementId
})=>{
    const content={
        title,body
    }

    fromImage=fromImage?fromImage:""
    await db.collection("Notifications").add({
        elementId,
        toId,
        type,createdAt:moment(now()).format("yyyy-MM-DD[T]HH:mm:ss[Z]"),
        fromId,
        content,
        fromImage,
        from_full_name,
        to_full_name,
        isView:false
    })
    if(Array.isArray(toId)){
        let skip=false
        toId.map(async(toId)=>{
            const {deviceToken,token} = await getUserToken(toId)
            if(token){
                const {id} = await checkToken({token:token})
                if(id){
                    if(!skip)
                        if(type=="booking"){
                            sendNotification({
                                ...content,
                                token:deviceToken
                            })
                        }
                    }
                }
        })
    }else{
        const {deviceToken,token} = await getUserToken(toId)
        if(!token){return null}
        const {id} = await checkToken({token:token})
        
        sendNotification({
            ...content,
            token:deviceToken
        })
        if(!id){return}
    
    }
}
export const getUserToken = async(userId)=>{
    return await db.collection("usersTokens").doc(userId).get()
    .then((e)=>e.data()).catch(()=>null)
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
    .then((e)=>{console.log(e)})
}

export const saveTokenInFirebase=({token,deviceToken})=>{
    console.log(deviceToken)
    if(deviceToken&&token){
        try{
            const {full_name,id}= checkToken({token})
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
        
    }else if(token){
        const {full_name,id}= checkToken({token})
        db.collection("usersTokens").doc(id).update({
            token
        })
    }
}