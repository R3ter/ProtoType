import { storeNotification } from "../../../methods/addNotification.js"
import { checkToken } from "../../../methods/Tokens.js"

const teacherAcceptAppointment=async(parent,{AppointmentID},{prisma,req})=>{
    const {id,full_name}=checkToken({token:req.headers.token,Roles:["TEACHER"],teacherActivationRequired:true})
    const appointment=await prisma.appointment.findUnique({
        where:{
            id:AppointmentID
        }
    })
    if(!appointment||
        appointment.stateKey!="waiting"||
        appointment.teacherId!=id){
            return false
    }
    await prisma.appointment.updateMany({
        where:{
            stateKey:"waiting",
            teacherId:id,
            date:appointment.date,
            OR:[{
                dateTime:{
                    gte:appointment.dateTime,
                    lt:appointment.to
                }
            },
            {
                to:{
                    gte:appointment.dateTime,
                    lt:appointment.to
                }
            }]
    },
        data:{
            stateKey:"rejected",
            rejectionReason:"teacher is not available !"
        }
    })
    return await prisma.appointment.update({
        where:{
            id:AppointmentID
        },
        data:{
            stateKey:"accepted"
        },
        include:{
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
            },
            student:{
                select:{
                    id:true,
                    full_name:true
                }
            }
        }
    }).then(async(e)=>{
        const adminsIds = await prisma.user.findMany({
            where:{
                Role:"ADMIN"
            }
          }).then((e)=>{return e.map((e)=>e.id)})
        storeNotification({
            elementId:e.id,
            title:`teacher ${e.teacher.full_name} has approved on the appointment for student ${e.student.full_name}`,
            body:"Accept or Reject it now",
            to_full_name:"admins",
            from_full_name:e.teacher.full_name,
            fromId:id,
            toId:adminsIds,
            fromImage:e.teacher.userInfo.image_URL,
            type:"booking"
        })
        storeNotification({
            elementId:e.id,
            title:`Your book has been approved by ${e.teacher.full_name}`,
            body:"view",
            to_full_name:e.student.full_name,
            from_full_name:full_name,
            fromId:id,
            toId:e.student.id,
            fromImage:e.teacher.userInfo.image_URL,
            type:"booking"
        })
        return true
    })
}
export default teacherAcceptAppointment