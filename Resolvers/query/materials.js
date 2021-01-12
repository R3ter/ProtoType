const materials=(parent, args, {req,prisma}, info)=>{
    return prisma.materials.findMany({
        include:{
            lookUp:true
        }
    },info)
}
export default materials