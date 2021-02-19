const getSchoolTypes=async (parent,ars,{prisma},info)=>{
    return await prisma.schoolType.findMany({
        include:{
          name:true
        }
    })
}

export default getSchoolTypes