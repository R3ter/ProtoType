import { banAnAccount, checkToken } from "../../../methods/Tokens.js"

const banUser=async(parent,{userId},{prisma,req},info)=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    banAnAccount({userId,prisma})
    return await prisma.user.update({
        where:{
            id:userId
        },
        data:{
            banned:true
        }
    }).then(()=>true)
    .catch(()=>false)
}

export default banUser