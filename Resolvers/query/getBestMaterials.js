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
            education_level:{
                select:{
                    id:true,
                    lookUp:true
                }
            }
        }
    },info)
    return materials.map(async (e)=>{
        return {
            ...e,
            ...{ratingCounts:0,averageRating:0}
        }
    })
}
export default BestMaterials