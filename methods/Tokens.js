import  jwt from 'jsonwebtoken';
import cryptoRandomString from 'crypto-random-string'
import apollo from 'apollo-server';
const {AuthenticationError}=apollo
import admin from 'firebase-admin'
const secret=process.env.SECRET
import frirebaseData from './firebaseData.js'
// import firebase from 'firebase'

import moment from 'moment';
// import { Pay } from './payment.js';
import { saveTokenInFirebase } from './addNotification.js';
const {now}=moment

const refreshTokens=[]

const loginToken=async({userid,role,Activate,email,phone_number,teacherIsActive,full_name,deviceToken})=>{
    let firebaseToken

    // if(includeFirebaseToken){
    //     // firebaseToken=await admin.auth().createCustomToken(userid)
    //     // firebase.auth().signInWithCustomToken(token)
    // }
    
    if(!userid||!role||!email||!phone_number||!full_name){
        throw new Error("some of the token data are missing")
    }
    
    const token = await jwt.sign({
        "aud": "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
        "iat": moment(now()).unix(),
        "exp": moment(now()).add(2,'seconds').unix(),
        "iss": "firebase-adminsdk-bxya3@school-92b2c.iam.gserviceaccount.com",
        "sub": "firebase-adminsdk-bxya3@school-92b2c.iam.gserviceaccount.com",
        "uid": userid,
        id: userid,Role:role,Activate,email,
        phone_number,teacherIsActive,
        full_name
    }, secret,
        { algorithm:"RS256" });

        
        const randomId = cryptoRandomString({length: 300})
        refreshTokens[userid]=randomId
        
        if(deviceToken){
            saveTokenInFirebase({
                deviceToken,
                token
            })
        }else{
            saveTokenInFirebase({
                token
            })
        }

    return {token,refreshToken:randomId,userId:userid,email,isActive:Activate,Role:role,
        teacherIsActive}
}
const RefreshToken= async (userId,RefreshToken,prisma)=>{
    if(refreshTokens[userId]&&refreshTokens[userId]==RefreshToken){
        const e = await prisma.user.findUnique({where:{id:userId},
            include:{
                userInfo:true,
                teacherProfile:true
            }})
            const {userInfo,id,full_name,Role,email,phone_number,Active}=e
        const info = await loginToken({userid:id,role:Role,Activate:Active,email,phone_number,
            teacherIsActive:e.teacherProfile?e.teacherProfile.teacherIsActive:
                e.Role=="TEACHER"?false:undefined,
                
                includeFirebaseToken:e.teacherProfile?e.teacherProfile.teacherIsActive:
                e.Role=="TEACHER"?false:true,full_name})

        return {result:true,
                    authentication:{
                        teacherDocumentUploaded:e.teacherProfile&&e.teacherProfile.IDFrontImageURL!=null
                        ?true:
                        e.Role=="TEACHER"?false:undefined,
                        teacherIsActive:e.teacherProfile?e.teacherProfile.teacherIsActive:
                        e.Role=="TEACHER"?false:undefined,
                        ...info,
                        isActive:Active,
                        isInfoComplet:!!e.userInfo,
                        materialSet:!!e.userInfo?(!!e.userInfo.preferred_materials?!!e.userInfo.preferred_materials.length:false):false,
                        full_name,
                        email,
                        phone_number
                    }}
    }
    throw new AuthenticationError("Unauthenticate")
    // return {result:false,error:"refresh token is not correct"}
}
const logout= async(userId,RefreshToken)=>{
    await admin.firestore().collection("usersToken")
        .doc(userId).delete()
        .then((e)=>e.data()).catch(()=>null)

    if(refreshTokens[userId]&&refreshTokens[userId]==RefreshToken){
        delete refreshTokens[userId]
        return true
    }
    return false
}
const checkToken=({token,activeRequired=true,Roles=["STUDENT","TEACHER","ADMIN"],
teacherActivationRequired=false})=>{
    if (token) {
        try{
            token=jwt.verify(token, secret,{algorithms:"RS256"})
        }catch(e){
            throw new Error('Authentication required')
        }
        if(token.Activate||!activeRequired){
            //throw new Error("account is not active")
        }
        if(!Roles.includes(token.Role)){
            throw new Error('you are not authorized to take this action')
        }
        if(teacherActivationRequired&&!token.teacherIsActive&&
            token.Role=="TEACHER"){
                throw new Error("your teacher account is not active yet")
        }
        return token
    }
    throw new AuthenticationError("Unauthenticate")
}

export {loginToken,checkToken,RefreshToken,logout}