export default {
    async totalAmount(parent,args,{prisma,req}){
        if(parent.teacherId)
        return await prisma.appointment.aggregate({
            where:{
              teacherId:parent.teacherId,
              stateKey:"accepted"
            },
            sum:{
              coursePrice:true
            }
          }).then((e)=>{
              return e.sum.coursePrice
          })
          return 0
    },
    async owedAmount(parent,args,{prisma,req}){
        if(parent.teacherId)
        return await prisma.appointment.aggregate({
            where:{
              teacherId:parent.teacherId,
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
          return 0
    }
}