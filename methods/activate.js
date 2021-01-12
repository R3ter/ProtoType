import cryptoRandomString from 'crypto-random-string'
import nodemailer from 'nodemailer'
import { checkToken } from './Tokens.js'

const codes=[]
const checkActivationCode = async(code,email,prisma)=>{

    if(codes[email]===code){
        await prisma.user.update({where:{email:email},
            data:{Active:true}
        })
        delete codes[email]
        return true
    }
    return false
}
const sendActivateCode=(email)=>{
    const randomId = cryptoRandomString({length: 30})
    codes[email] = randomId
    setTimeout(()=> {
        delete codes[email]
      }, 300000);
      console.log(`http://localhost:4000/activateAccount?userId=${email}&code=${randomId}`)

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
        text:`here is ur link http://localhost:4000/activateAccount?userId=${email}&code=${randomId}`
    },(e)=>{
        if(e){
            console.log(e)
        }
    })


}
const ResendActivationCode=(token)=>{
    if(token){
        const info=checkToken(token,false)
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
