import { checkToken } from "../../methods/Tokens.js"

const getMyInfo=(parent, {userId}, {req,prisma}, info)=>{
    checkToken({token:req.headers.token})
    return prisma.userInfo.findUnique({
        where:{
            userId
        },include: {
            user: true,
            Current_education_level:{
                select:{
                    type:{
                        select:{
                            name:true,
                            id:true
                        }
                    },
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