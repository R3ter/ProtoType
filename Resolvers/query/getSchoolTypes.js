const getSchoolTypes=async (parent,ars,{prisma},info)=>{
    return await prisma.schoolType.findMany({
        include:{
          name:true,
          Education_Level:true
        }
    })
}

export default getSchoolTypes