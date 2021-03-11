import { storeNotification } from "../../../methods/addNotification.js"
import { checkToken } from "../../../methods/Tokens.js"

const teacherAcceptAppointment=async(parent,{AppointmentID},{prisma,req})=>{
    const {id}=checkToken({token:req.headers.token,Roles:["ADMIN"]})
    if(AppointmentID=="") return false
    const appointment=await prisma.appointment.findUnique({
        where:{
            id:AppointmentID
        }
    })
    if(!appointment||appointment.adminAccepted){
        return false
    }
    return await prisma.appointment.update({
        where:{
            id:AppointmentID
            },
        data:{
            adminAccepted:true
        },
        include:{
            student:{
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
            teacher:{
                select:{
                    full_name:true,
                    id:true
                }
            }
        }
    }).then((e)=>{
        storeNotification({
            elementId:e.id,
            title:`you have a new book by ${e.student.full_name}`,
            body:"Accept or Reject it now",
            to_full_name:e.student.full_name,
            from_full_name:e.teacher.full_name,
            fromId:e.teacher.id,
            toId:e.student.id,
            fromImage:e.student.userInfo.image_URL,
            type:"booking"
        })
        return true
    })
}
export default teacherAcceptAppointment