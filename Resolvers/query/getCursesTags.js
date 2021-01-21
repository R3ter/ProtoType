const getCursesTags=async(parent, {search}, {req,prisma}, info)=>{
    return await prisma.courseTag.findMany({
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
export default getCursesTags