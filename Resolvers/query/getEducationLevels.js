const getEducationLevels=(parent, args, {req,prisma}, info)=>{
    return prisma.education_Level.findMany({
        include:{
            lookUp:true
        }
    })
}

export default getEducationLevels