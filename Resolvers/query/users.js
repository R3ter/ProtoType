import {checkToken} from './../../methods/Tokens.js'
const users=(parent, args, {req,prisma}, info)=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return prisma.user.findMany({
        include: {
            userInfo:{
                select:{
                    birth_date:true,
                    preferred_materials:true,
                    City:true,
                    Area:true
                }
            }
        }
    },info)
}
export default users