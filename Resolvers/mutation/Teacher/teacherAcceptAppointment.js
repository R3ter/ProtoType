import { checkToken } from "../../../methods/Tokens.js"

const teacherAcceptAppointment=async(parent,{AppointmentID},{prisma,req})=>{
    const {id}=checkToken({token:req.headers.token,Roles:["TEACHER"]})
    const appointment=await prisma.appointment.findUnique({
        where:{
            id:AppointmentID
        }
    })
    if(appointment.stateKey!="waiting"||appointment.teacherId!=id){
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
    return !!await prisma.appointment.update({
        where:{
            id:AppointmentID
        },
        data:{
            stateKey:"accepted"
        }
    })
}
export default teacherAcceptAppointment