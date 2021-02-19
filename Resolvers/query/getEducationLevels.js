const getEducationLevels=(parent, {schoolTypeId}, {req,prisma}, info)=>{
    return prisma.education_Level.findMany({
        where:{
            type:{
                id:schoolTypeId
            }
        },
        include:{
            lookUp:true
        }
    })
}

export default getEducationLevels