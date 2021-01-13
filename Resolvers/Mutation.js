import addUser from './mutation/AddUser.js'
import CreateMaterial from './mutation/CreateMaterial.js'
import login from './mutation/login.js'
import addUserInfo from './mutation/addUserInfo.js'
import {RefreshToken,logout, loginToken} from './../methods/Tokens.js'
import {ResendActivationCode,checkActivationCode} from './../methods/activate.js'
const Mutation={
    addUser,CreateMaterial,login,addUserInfo,
    logout:(parent,{userId,refreshToken})=>logout(userId,refreshToken)
    ,refreshToken:(parent,{userId,refreshToken})=>RefreshToken(userId,refreshToken),
    resendActivationCode:(parent,args,{req})=>ResendActivationCode(req.headers.token),
    activateAccount:(parent,{code},{req,prisma})=>checkActivationCode(code,req.headers.token,async({id})=>{
        const user=await prisma.user.update({where:{id},
            data:{Active:true}
        })
        return await loginToken(user.id,user.Role,user.Active,user.email)
    },()=>new Error("code is incorrect"))

}
export default Mutation