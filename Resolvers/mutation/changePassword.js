import validator from 'validator';
import bcrypt from 'bcrypt'
import { checkToken } from "../../methods/Tokens.js"
const changeMyPassword=async(parent,{currentPassword,newPassword},{prisma,req})=>{
    const {id}=checkToken({token:req.headers.token})

    if(!validator.isLength(newPassword,{min:6,max:30})){
        return {result:false,error:"new password must be at least 6 to 30 characters long"}
    }
    const {password} = await prisma.user.findUnique({
        where:{
            id
        }
    })
    const hash = bcrypt.hashSync(newPassword, 6);
    console.log(hash)
    if(bcrypt.compareSync(currentPassword,password)){
        return await prisma.user.update({
            where:{
                id,
            },data:{
                password:hash
            }
        }).then(()=>{
            return {result:true}
        }).catch(()=>{
            return {result:false,error:"Current password does not match."}
        })
    }
    return{result:false,error:"Current password does not match."}
}

export default changeMyPassword