export default {
    async appointmentsCount(parent,args,{prisma,req},info){
        return await prisma.appointment.count({
            where:{
                studentId:parent.id
            }
        })
    },
    async tutors(parent,args,{prisma,req},info){
        return await prisma.appointment.findMany({
            where:{
                studentId:parent.id
            },
            include:{
                teacher:true
            }
        }).then((e)=>{
            console.log(e)
            return e.map((e)=>e.teacher)
        })
    }
}