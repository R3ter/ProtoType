import {checkToken} from './../../../methods/Tokens.js'
export default async(parent,{teacherId},{prisma,req})=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.payment.findMany({
        where:{
            Appointment:{
                teacherId
            }
        },
        include:{
            Appointment:true
        }
    }).then((e)=>{
        return {
            teacherId:e[0]?e[0].Appointment.teacherId:undefined,
            payments:e
            
        }
    })
}