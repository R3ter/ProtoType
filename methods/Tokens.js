import  jwt from 'jsonwebtoken';
import cryptoRandomString from 'crypto-random-string'
import apollo from 'apollo-server';
import admin from 'firebase-admin'
import frirebaseData from './firebaseData.js'
const {AuthenticationError}=apollo
const secret="dwawadhawbfhjavbffbhwafafwawf"

const refreshTokens=[]

admin.initializeApp({
    credential:admin.credential.cert(frirebaseData),
    databaseURL: "https://school-92b2c-default-rtdb.firebaseio.com/"
  })

const loginToken=async(userid,role,Activate,email,phone_number)=>{
      const firebaseToken=await admin.auth().createCustomToken(userid)
    if(!userid||!role||!email||!phone_number){
        throw new Error("some of the token data are missing")
    }

    // firebase.database().ref('users/' + userId).set({
    //     username: "name",
    //     email: "email"
    //   })

    const token = await jwt.sign({firebaseToken,
        id: userid,Role:role,Activate,email,phone_number}, secret,{ expiresIn: '1y' });
    
    const randomId = cryptoRandomString({length: 300})
    refreshTokens[userid]=randomId

    return {token,refreshToken:randomId,userId:userid,email,isActive:Activate,Role:role}
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
const checkToken=({token,activeRequired=true,Roles=["STUDENT","TEACHER"]})=>{
    if (token) {
        try{
            token=jwt.verify(token, secret)
        }catch(e){
            throw new Error('Authentication required')
        }
        if(!Roles.includes(token.Role)){
            throw new Error('you are not authorized to take this action')
        }
        if(token.Activate||!activeRequired){
        }
        //throw new Error("account is not active")
        return token
    }
    throw new AuthenticationError("Unauthenticate")
}

export {loginToken,checkToken,RefreshToken,logout}