import { checkToken } from "../../methods/Tokens.js"

const materials=(parent, args, {req,prisma}, info)=>{
    checkToken({token:req.headers.token})
    return prisma.materials.findMany({
        include:{
            lookUp:true,
            education_level:{
                select:{
                    education_level:true,
                    lookUp:true
                }
            }
        }
    },info)
}
export default materials