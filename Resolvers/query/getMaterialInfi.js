const getMaterialInfo=async(parent,{materialID},{prisma,req},inf)=>{
    return{ ...await prisma.materials.findUnique({
        where:{
            id:materialID
        },
        include:{
            lookUp:true,
            description:true
        }
    }).catch(()=>null),studentImages:await prisma.materialReview.findMany({
        where:{
            materialID
        },
        take:5,
        include:{
            User:{select:{
                userInfo:{
                    select:{
                        image_URL:true
                    }
                }
            }}
        }
    }).then((e)=>{
        return e.map((e)=>{
            return e.userInfo.image_URL
        })
    }),
    ...await prisma.materialReview.aggregate({
        where:{
            id:materialID
          },
        avg:{
            ratingStars:true
        },
        count:true
      }).then((e)=>({ratingCounts:e.count,averageRating:e.avg.ratingStars}))}
}
export default getMaterialInfo