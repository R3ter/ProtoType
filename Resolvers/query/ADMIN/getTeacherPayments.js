import {checkToken} from './../../../methods/Tokens.js'
export default async(parent,{teacherId},{prisma,req})=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.appointment.findMany({
        where:{
            teacherId,
            stateKey:"accepted"
        },
        include:{
            payment:true
        }
    }).then((e)=>{
        return {
            teacherId,
            payments:e.map((e)=>{
                    return{
                        id:e.payment?e.payment.id:"not paid yet",
                        Appointment:e,
                        createdAt:e.payment?e.payment.createdAt:"until now",
                        hasBeenPaid:e.payment?true:false
                    }
                })
            
        }
    })
}