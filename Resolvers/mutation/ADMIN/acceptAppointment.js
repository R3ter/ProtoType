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
    return !!await prisma.appointment.update({
        where:{
            id:AppointmentID
            },
        data:{
            adminAccepted:true
        }
    })
}
export default teacherAcceptAppointment