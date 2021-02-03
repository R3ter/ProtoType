import { checkToken } from "../../methods/Tokens.js"

const BestMaterials= async(parent, args, {req,prisma}, info)=>{
    //checkToken({token:req.headers.token})
    const materials = await prisma.materials.findMany({
        include:{
            lookUp:true,
            teacher:true,
            description:true,
            tags:{
                select:{
                    lookUp:true
                }
            },
            reviews:{
                select:{
                    user:{
                        select:{
                            userInfo:true
                        }
                    }
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
            ...await prisma.rating.aggregate({
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