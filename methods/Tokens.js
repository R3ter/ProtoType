import  jwt from 'jsonwebtoken';
import cryptoRandomString from 'crypto-random-string'
const secret="dwawadhawbfhjavbffbhwafafwawf"

const refreshTokens=[]

const loginToken=async(userid,role,Activate,email)=>{

    const token = await jwt.sign({ id: userid,Role:role,Activate,email }, secret,{ expiresIn: '1h' });
    
    const randomId = cryptoRandomString({length: 255})
    refreshTokens[userid]={refreshToken:randomId,Role:role}

    return {token,refreshToken:randomId,userId:userid}
}
const RefreshToken= async (userId,RefreshToken)=>{
    if(refreshTokens[userId]&&refreshTokens[userId].refreshToken==RefreshToken){
        return loginToken(userId,refreshTokens[userId].Role)
    }
    throw new Error("RefreshToken is incorrect")
}
const logout= async(userId,RefreshToken)=>{
    if(refreshTokens[userId]&&refreshTokens[userId].refreshToken==RefreshToken){
        delete refreshTokens[userId]
        return true
    }
    return false
}
const checkToken=(token,activeRequired=true)=>{
    if (token) {
        try{
            token=jwt.verify(token, secret)
        }catch(e){
            throw new Error('Authentication required')
        }
        
        if(token.Activate||!activeRequired){
            return token
        }
        throw new Error("account is not active")
    }
    throw new Error('Authentication required')
}

export {loginToken,checkToken,RefreshToken,logout}