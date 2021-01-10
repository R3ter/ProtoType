import { checkToken } from "../../methods/Tokens.js"

const getMyInfo=(parent, args, {req,prisma}, info)=>{
    const {id} = checkToken(req.headers.token)
    return prisma.userInfo.findUnique({
        where:{
            userId:id
        },include: {
            user: true,
            Area:true,
            City:true,
            preferred_materials:true
        }
    })
}
export default getMyInfo