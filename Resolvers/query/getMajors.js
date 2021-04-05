const getMajors=async (parent,args,{prisma,req},info)=>{
    return await prisma.major.findMany({
        include:{
            name:true
        }
    })
}

export default getMajors