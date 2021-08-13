import { checkToken } from "../../../methods/Tokens.js"

export default async (parent,{role,word},{prisma,req})=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.user.findMany({
        where:{
            full_name:{
              contains:word,
              mode:"insensitive"
            },
            Role:role
        },
        include:{
            userInfo:true
        }
    })
}