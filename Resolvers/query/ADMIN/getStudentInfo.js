export default async(parent,{studentId},{req,prisma},info)=>{
    return await prisma.user.findMany({
        where:{
            
        }
    })
}