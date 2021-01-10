const materials=(parent, args, {req,prisma}, info)=>{
    return prisma.materials.findMany()
}
export default materials