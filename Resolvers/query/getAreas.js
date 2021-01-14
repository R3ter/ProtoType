const Areas=(parent, {cityId}, {req,prisma}, info)=>{
    return prisma.area.findMany({
        where:{
            cityId
        },
        include:{
            lookUp:true,
            City:{
                select:{
                    lookUp:true,
                    id:true,
                    longitude:true,
                    latitude:true
                }
            }
        }
    })
}
export default Areas