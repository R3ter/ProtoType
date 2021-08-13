import {checkToken} from './../../../methods/Tokens.js'
export default async (parent,{appointmentId},{prisma,req})=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.payment.create({
        data:{
            appointmentId
        }
    }).then(()=>true)
    .catch(()=>false)
}