import moment from 'moment'
import { checkToken } from "../../methods/Tokens.js"
const Appointment={
    time(parent, args, {req}){
        return {
            from:moment.utc(parent.from).format("HH:mm a"),
            to:moment.utc(parent.to).format("HH:mm a")
        }
    },
    async isReview(parent,args,{prisma}){
        return parent.review?true:false
    },
    schoolTypeName(parent,args,{req}){
        if(parent.educationLevel)
            return parent.educationLevel[0].type.name[req.headers.lang||"eng"]
    },
    education_level_name(parent,args,{req}){
        console.log(parent)
        // return parent.educationLevel.
        //     lookUp[req.headers.lang||"eng"]
        
    },
    async canContact(parent,args,{prisma,req}){
        const {id,Role} = checkToken({token:req.headers.token})
        if(Role=="STUDENT")
            return await prisma.appointment.count({
                where:{
                    teacherId:parent.teacherId,
                    studentId:id,
                    stateKey:"accepted"
                }
            }).then((e)=>e>0)
        else if(Role=="TEACHER")
            return await prisma.appointment.count({
                where:{
                    teacherId:id,
                    studentId:parent.studentId,
                    stateKey:"accepted"
                }
            }).then((e)=>e>0)
    }
}
const Appointment_state={
    name(parent, args, {req}){
        return parent.name[req.headers.lang||"eng"]
    }
}
export default {Appointment,Appointment_state}