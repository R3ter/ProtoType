const getMaterialReviews=async (parent,{materialId,skip=0,take=5},{prisma,req},info)=>{
    return await prisma.materialReview.findMany({
        where:{
            materialID:materialId
        },
        skip,take,
        include:{
            User:{
                select:{
                    full_name:true,
                    userInfo:{
                        select:{
                            image_URL:true
                        }
                    }
                }
            }
        }
    })
}

export default getMaterialReviews