import { checkToken } from "../../methods/Tokens.js"

const BestMaterials= async(parent, args, {req,prisma}, info)=>{
    checkToken({token:req.headers.token})
    const materials = await prisma.materials.findMany({
        include:{
            lookUp:true,
            description:true,
            tags:{
                select:{
                    lookUp:true
                }
            },
            reviews:true,
            teacher:{
                select:{
                    userInfo:{
                        select:{
                            City:{
                                select:{
                                    lookUp:true
                                }
                            },
                            Area:{
                                select:{
                                    lookUp:true
                                }
                            },
                            birth_date:true,
                            address:true,
                            longitude:true,
                            latitude:true,
                            image_URL:true,
                            cover_URL:true
                        }
                    },
                    full_name:true,
                    email:true,
                    phone_number:true,
                    
                }
            },
            education_level:{
                select:{
                    lookUp:true
                }
            }
        }
    },info)
    return materials.map(async (e)=>{
        return {
            ...e,
            ...await prisma.materialReview.aggregate({
                where:{
                    id:e.id
                  },
                avg:{
                    ratingStars:true
                },
                count:true
              }).then((e)=>({ratingCounts:e.count,averageRating:e.avg.ratingStars}))
        }
    })
}
export default BestMaterials