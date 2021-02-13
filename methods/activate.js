import cryptoRandomString from 'crypto-random-string'
import nodemailer from 'nodemailer'
import { checkToken } from './Tokens.js'

const codes=[]
const checkActivationCode = async(code,token,callback,rejected)=>{
    const data=await checkToken({token,activeRequired:false})
    if(codes[data.email]===code){
        delete codes[data.email]
        return callback(data)
    }
    return rejected()
}
const sendActivateCode=(email)=>{
    const randomId = cryptoRandomString({length: 4, type: 'numeric'})
    codes[email] = randomId
    
    console.log(`activation code ${randomId}`)

    setTimeout(()=> {
        delete codes[email]
      }, 300000);
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'epic.collection100@gmail.com',
        pass: 'epic123456'
    },
    tls: {
        rejectUnauthorized: false
    }
    });
    transporter.sendMail({
        from:"Teachery Experts",
        to:email,
        subject:"testing",
        text:`ur code is ${randomId}`
    },(e)=>{
        if(e){
            console.log(e)
        }
    })


}
const ResendActivationCode=(token)=>{
    if(token){
        const info=checkToken({token,activeRequired:false})
        if(info.Activate){
            return false
        }
        if(info.email){
            sendActivateCode(info.email)
            return true
        }
    }
    return false
}

export {sendActivateCode,checkActivationCode,ResendActivationCode}
