import { checkToken } from "./../../../methods/Tokens.js"

const createMaterial= async (parent,{
    name
},{prisma,req})=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.schoolType.create({
        data:{
           name:{
               create:{
                   ...name
               }
           }
        }
    }).then(()=>true).catch(()=>false)
}
export default createMaterial