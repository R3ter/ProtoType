const getEducationLevels=(parent, {schoolType}, {req,prisma}, info)=>{
    return prisma.education_Level.findMany({
        where:{
            type:{
                schoolType
            }
        },
        include:{
            type:true,
            lookUp:true
        }
    })
}

export default getEducationLevels