export default {
    async totalAmount(parent,args,{prisma,req}){
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
    },
    async owedAmount(parent,args,{prisma,req}){
      console.log(parent)
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
    }
}