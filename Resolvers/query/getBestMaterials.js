import { checkToken } from "../../methods/Tokens.js"

const BestMaterials=(parent, args, {req,prisma}, info)=>{
    //checkToken({token:req.headers.token})
    return prisma.materials.findMany({
        include:{
            lookUp:true,
            teacher:true,
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
}
export default BestMaterials