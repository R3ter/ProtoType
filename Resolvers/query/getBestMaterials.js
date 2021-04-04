import { checkToken } from "../../methods/Tokens.js"

const BestMaterials= async(parent, {take=5,skip=0}, {req,prisma}, info)=>{
    const {educationLevelId} = checkToken({token:req.headers.token})
    const materials = await prisma.materials.findMany({
        take,skip,
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
                    lookUp:true,
                    type:{
                        select:{
                            id:true,
                            name:true
                        }
                    }
                }
            }
        }
    },info)
    return materials.map(async (e)=>{
        return {
            ...e
        }
    })
}
export default BestMaterials