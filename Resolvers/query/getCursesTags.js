const getCursesTags=async(parent, {search}, {req,prisma}, info)=>{
    if(search){
        return await prisma.courseTag.findMany({
            include:{
                lookUp:true
            },
            where:{
                lookUp:{
                    OR:[{
                        fr:{
                          contains:search
                        }
                    },{
                        ar:{
                          contains:search
                        }
                    },{
                        eng:{
                          contains:search
                        }
                    }
                ]
            }
        }
    })
    }
    return await prisma.courseTag.findMany({
        include:{
            lookUp:true
        }
    })
}
export default getCursesTags