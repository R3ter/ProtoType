import { checkToken } from "../../methods/Tokens.js"

const getMyInfo=(parent, {userId}, {req,prisma}, info)=>{
    checkToken({token:req.headers.token})
    return prisma.userInfo.findUnique({
        where:{
            userId
        },include: {
            user: true,
            Area:{
                select:{
                    lookUp:true,
                    id:true,
                    longitude:true,
                    latitude:true
                }
            },
            Current_education_level:{
                select:{
                    lookUp:true,
                    id:true
                }
            },
            preferred_materials:{
                select:{
                    lookUp:true,
                    id:true
                }
            }
        }
    })
}
export default getMyInfo