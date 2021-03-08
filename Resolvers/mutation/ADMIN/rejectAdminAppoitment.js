import { checkToken } from "../../../methods/Tokens.js"

const reject = async(parent,{rejectionReason,AppointmentID},{req,prisma})=>{
    const {id}=checkToken({token:req.headers.token,Roles:["ADMIN"]})
    if(AppointmentID=="") return false

    return !!await prisma.appointment.update({
        where:{
            id:AppointmentID
        },
        data:{
            stateKey:"rejected",
            rejectionReason:"admin declined this appointment!"
        }
    })
}

export default reject