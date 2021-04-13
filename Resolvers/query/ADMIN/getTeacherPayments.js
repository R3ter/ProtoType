export default async(parent,{teacherId},{prisma,req})=>{
    return await prisma.payment.findMany({
        where:{
            appoitment
        }
    })
}