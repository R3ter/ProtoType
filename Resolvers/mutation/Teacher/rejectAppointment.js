import { rejects } from "assert"
import { checkToken } from "../../../methods/Tokens.js"

const reject =async(parent,{rejectionReason,AppointmentID},{req,prisma})=>{
    const {id}=checkToken({token:req.headers.token,Roles:["TEACHER"],teacherActivationRequired:true})
    return await prisma.appointment.updateMany({
        where:{
            AND:[
                {
                    teacherId:id
                },
                {
                    stateKey:"waiting"
                },
                {
                    id:AppointmentID
                }

            ]
        },
        data:{
            stateKey:"rejected",
            rejectionReason
        }
    }).then((e)=>e.count>0)
}

export default reject