import moment from 'moment'
const Appointment={
    time(parent, args, {req}){
        return {
            from:moment.utc(parent.from).format("HH:mm a"),
            to:moment.utc(parent.to).format("HH:mm a")
        }
    },
    async isReview(parent,args,{prisma}){
        return await prisma.teacherReview.count({
            where: {
                studentId:parent.studentId,
                teacherId:parent.teacherId
            },
        }).then((e)=>e>0)
    }
}
const Appointment_state={
    name(parent, args, {req}){
        return parent.name[req.headers.lang||"eng"]
    }
}
export default {Appointment,Appointment_state}