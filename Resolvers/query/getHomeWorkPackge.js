const homeWorksPackge=async (parent,{MaterialId},{prisma})=>{
    return await prisma.homeWorkPackage.findMany({
        where:{
            MaterialId
        }
    })
}

export default homeWorksPackge