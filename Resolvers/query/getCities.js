const cities=(parent, args, {req,prisma}, info)=>{
    return prisma.city.findMany({
        include:{
            lookUp:true
        }
    })
}
export default cities