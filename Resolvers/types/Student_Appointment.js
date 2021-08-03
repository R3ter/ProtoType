export default {
    async AcceptedAppointmentCount(parent,args,{prisma,req}){
        return await prisma.appointment.count({
            where:{
              teacherId:parent.studentId,
              stateKey:"accepted"
            }
          })
    },
    async RejectedAppointmentCount(parent,args,{prisma,req}){
        return await prisma.appointment.count({
            where:{
              studentId:parent.studentId,
              stateKey:"rejected"
            }
        })
    },
    async totalPaidAmount(parent,args,{prisma,req}){
        return await prisma.appointment.aggregate({
            where:{
                studentId:parent.studentId,
                payment:{
                    isNot:null
                }
            },
            sum:{
                coursePrice:true
            }
        }).then((e)=>{
            return e.sum.coursePrice
        })
    }
}