export default async(parent,{skip=0,take=10},{prisma,req})=>{
    return await prisma.appointment.findMany({
        where:{
            payment:{
                isNot:null
            }
        }
    })
}