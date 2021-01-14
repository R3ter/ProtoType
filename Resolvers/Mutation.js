import addUser from './mutation/AddUser.js'
import CreateMaterial from './mutation/CreateMaterial.js'
import login from './mutation/login.js'
import addUserInfo from './mutation/addUserInfo.js'
import {RefreshToken,logout, loginToken} from './../methods/Tokens.js'
import {ResendActivationCode,checkActivationCode} from './../methods/activate.js'
const Mutation={
    addUser,CreateMaterial,login,addUserInfo,
    logout:(parent,{userId,refreshToken})=>logout(userId,refreshToken)
    ,refreshToken:(parent,{userId,refreshToken},{prisma})=>RefreshToken(userId,refreshToken,prisma),
    resendActivationCode:(parent,args,{req})=>ResendActivationCode(req.headers.token),
    activateAccount:(parent,{code},{req,prisma})=>checkActivationCode(code,req.headers.token,async({id,role})=>{
        const {
            first_name,
            last_name,
            email,
            phone_number
        }=await prisma.user.update({where:{id},
            data:{Active:true}
        })
        const info=await loginToken(id,role,true,email,phone_number)
        return {result:true,
            authentication:{
              ...info,
              isActive:true,
              first_name,
              last_name,
              email
              ,phone_number
          }}
    },()=>({result:false,error:"invalid code"}))

}
export default Mutation