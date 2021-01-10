const cities=(parent, args, {req,prisma}, info)=>{
    return prisma.city.findMany()
}
export default cities