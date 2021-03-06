const getMaterialInfo=async(parent,{materialID},{prisma,req},info)=>{
    return await prisma.materials.findUnique({
        where:{
            id:materialID
        },
        include:{
            lookUp:true,
            description:true,
            education_level:{
                select:{
                    id:true,
                    lookUp:true
                }
            }
        }
    }).catch(()=>null)
}

export default getMaterialInfo