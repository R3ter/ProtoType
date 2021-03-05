import  jwt from 'jsonwebtoken';
import cryptoRandomString from 'crypto-random-string'
import apollo from 'apollo-server';
const {AuthenticationError}=apollo

const secret="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCgm4mqpfh5E1u/\ncsDFPIqSkVLAWQNI9GQRz5VpIiW2dhScFmLZVicuvMX1Ah1egHuLBioUl7hW3WNd\nsn3M1Mb4t9RT6R8cNm0+/D2uoNCaET9NUy0Ch9He3aV4d+UbCbnmEoIXF8CxyHzw\nqKO/nfuzsM9OVHVTvzqqsbx5hY4u1SYHKYM+3wYCgFIiMBuPv1L6uHH8gUKbVYk5\niuhNDx7cCiw2XPADcQoxI9O7LEOpz9ObyazM4PjWxKawHkEiJwSaYwLovHPaDo01\nC1LOgAOdp2WQh2ZokHyLNV5mYGN8+c4/K0L5h85G+P2ucSCb5k0RCy1BIG0SDbC+\nFX4TM6nhAgMBAAECggEAReqwCZvrCTpGLJfWF4b9hETDU3zskyvhDGfj0TrOVBof\narvMGHUK5avEOZ7MDkG8ho8ObpyF4TrLcRSs8yiF3eyZAFZx9qQy9sJ0T7suVIPB\nnPXimEFsOasfx8vZ7uVTCjdwboEmn755tYKUlmw+EMGd3ami0exjq79oHzbm6Les\nB/sez1kvMn8Wx60bqHiowZV9Bw7JGGxRR5KstWAaJEmn43rcmHt6qMZR2QF16gwl\nbu7UBhlbqRuAlCXgwtV6CJO0nikp4GwCdwfFj0d4dAbFvrMFZK9Ir5ogvCVWw/8P\nIU80dcruFIoFIj6x7EraHC1K39Xt2hSEuvmfAyX16QKBgQDi2kQD7IjWR5TyZp2L\nhelmsXmqnH77VWJKbjr5XCqigPde+YilPxxGOPexPqrVeCMmRmPBMKO6mNOHSDSr\nixNGFoTQ0Sou0ZsEMp0ThwT5IFgW1c91uHTl/J5Yie2cuqGKmcJinQVzzQJIp1ni\nHRY0Dgza3h5W6v8yGoaZ4/p6CwKBgQC1Pk/Nb7t4CZwz3aKTk9sLZv9euhTnrpAU\nB6EVLvp97ndHp7obrrSa3unfVqCzvUIVFnoedgUOaWD3EP7p++C3Q7IAePdlKP0M\nL4JJn+jNHl1Fhx3onWblMEIim7LMtIu9w/f/fR9h22RJ2gelxA9DmzeK0R4jk3uw\nXzLYp/3LQwKBgQCwFy1kvl8ZtkbwQqdYfoJGrMz8mq4W+phpnlc46UpPCjz7BEgF\nvY99EwtyEmsZeUAPneQhOlhdp/PKt0nrPvGfHivKzBIqdZoXEBLN7aj2mRzH3QBF\nKQHU5Nslbyt61YQ/yksRsUFiOmjjbMRguKNblOx1mKWEYrXldqG1IzpzMQKBgEjM\noplOC+sHUSq0F51XgmBuGp0d+U+mGlExT06G9C6pHlg10tdTsU+TwjTnQt1vY5+8\ny4h4t0c2pLAYr4uklHqIQnNWI2kKsbm3S4nvJT9etvA6eZT5xF7Cp43nJEZ9LrQm\nhvKke3p++SWA4hl/SvJI4mJr5MM9di09z9qef56pAoGAV4g55WfZEdRiHVIsYAK6\nOfCcj9K2WlEwB9RfJut/CeRRXDfZ3a3jxXsgVT6SZB7XtqAeaFxD7kiAd6IBAAmj\nP9fvkkb6SCa7ip7f6z+NrPXdbD9KT6GnNhJ47jrVbY7O7057jRFZFdmVxc/c+0q/\no2HbQDC4NdQ3irFrTPEipnM=\n-----END PRIVATE KEY-----\n"
import frirebaseData from './firebaseData.js'
// import firebase from 'firebase'

import admin from 'firebase-admin'
import moment from 'moment';
import { Pay } from './payment.js';
const {now}=moment

const refreshTokens=[]

const loginToken=async({userid,role,Activate,email,phone_number,teacherIsActive,teacherDpcumentUploaded,
includeFirebaseToken=true,full_name})=>{
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
        "exp": moment(now()).add(2,'hours').unix(),
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
        
    return {token,refreshToken:randomId,userId:userid,email,isActive:Activate,Role:role,firebaseToken,
        teacherDpcumentUploaded
        ,teacherIsActive}
}
const saveTokenInFirebase=({token,deviceToken})=>{
    if(deviceToken&&token){
        try{
            const {full_name,id}=checkToken(token)
            const db = admin.firestore()
            db.collection("usersTokens").doc(id).set({
                id:id,
                full_name,
                token,
                deviceToken,
                createdAt:moment(now()).format("yyyy-MM-DD[T]HH:mm:ss[Z]")
            })   
        }catch(e){
            return
        }
    }
}
const RefreshToken= async (userId,RefreshToken,prisma)=>{
    if(refreshTokens[userId]&&refreshTokens[userId]==RefreshToken){
        const {Active,full_name,email,phone_number,Role} = await prisma.user.findUnique({where:{id:userId}})
        const info=await loginToken(userId,Role,Active,email,phone_number)
        return {result:true,
        authentication:{
            ...info,
            full_name,
            email
            ,phone_number
        }}
    }
    throw new AuthenticationError("Unauthenticate")
    // return {result:false,error:"refresh token is not correct"}
}
const logout= async(userId,RefreshToken)=>{
    if(refreshTokens[userId]&&refreshTokens[userId]==RefreshToken){
        delete refreshTokens[userId]
        return true
    }
    return false
}
const checkToken=({token,activeRequired=true,Roles=["STUDENT","TEACHER"],
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

export {loginToken,checkToken,RefreshToken,logout,saveTokenInFirebase}