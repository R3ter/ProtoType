import { checkToken } from "../../methods/Tokens.js"

const getMyInfo=(parent, args, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    return prisma.userInfo.findUnique({
        where:{
            userId:id
        },include: {
            user: true,
            userInfo:true,
            Area:{
                select:{
                    lookUp:true,
                    id:true,
                    longitude:true,
                    latitude:true
                }
            },
            City:{
                select:{
                    lookUp:true,
                    id:true,
                    longitude:true,
                    latitude:true
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