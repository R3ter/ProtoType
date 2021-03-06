import { storeNotification } from "../../../methods/addNotification.js"
import { checkToken } from "../../../methods/Tokens.js"

const teacherAcceptAppointment=async(parent,{AppointmentID},{prisma,req})=>{
    const {id}=checkToken({token:req.headers.token,Roles:["TEACHER"]})
    const appointment=await prisma.appointment.findUnique({
        where:{
            id:AppointmentID
        }
    })
    if(!appointment||
        appointment.stateKey!="waiting"||
        appointment.teacherId!=id){
            console.log(appointment.teacherId)
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
                    id:true
                }
            }
        }
    }).then((e)=>{
        storeNotification({
            title:`Your book has been aproved by ${e.teacher.full_name}`,
            body:"view",
            full_name:e.teacher.full_name,
            fromId:id,
            toId:e.student.id,
            fromImage:e.teacher.userInfo.image_URL,
            type:"booking"
        })
        return true
    })
}
export default teacherAcceptAppointment