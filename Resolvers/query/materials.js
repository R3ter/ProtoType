import { checkToken } from "../../methods/Tokens.js"

const BestMaterials= async(parent, {skip=0,take=5}, {req,prisma}, info)=>{
    checkToken({token:req.headers.token})
    const materials = await prisma.materials.findMany({
        skip,take,
        include:{
            lookUp:true,
            description:true,
            tags:{
                select:{
                    lookUp:true
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