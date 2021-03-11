import { storeNotification } from "../../../methods/addNotification.js"
import { checkToken } from "../../../methods/Tokens.js"

const reject =async(parent,{rejectionReason,AppointmentID},{req,prisma})=>{
    const {id,full_name}=checkToken({token:req.headers.token,Roles:["TEACHER"],teacherActivationRequired:true})
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
        },
        include:{
            student:{
                select:{
                    id:true,
                    full_name:true
                }
            },
            teacher:{
                select:{
                    id:true,
                    full_name:true,
                    userInfo:{
                        select:{
                            image_URL:true
                        }
                    }
                }
            }
        }
    }).then((e)=>{
        const adminsIds = await prisma.user.findMany({
            where:{
                Role:"ADMIN"
            }
          }).then((e)=>{return e.map((e)=>e.id)})
        storeNotification({
            elementId:e.id,
            title:`teacher ${full_name} has rejected the appointment for student ${e.student.full_name}`,
            body:"reason: "+rejectionReason,
            to_full_name:"admins",
            from_full_name:full_name,
            fromId:id,
            toId:adminsIds,
            fromImage:e.teacher.userInfo.image_URL,
            type:"booking"
        })
        storeNotification({
            elementId:e.id,
            title:`teacher ${e.teacher.full_name} has rejected you'r appointment request`,
            body:"reason: "+rejectionReason,
            to_full_name:e.teacher.full_name,
            from_full_name:full_name,
            fromId:id,
            toId:e.studentId,
            fromImage:e.teacher.userInfo.image_URL,
            type:"booking"
        })
        return e.count>0
    })
}

export default reject