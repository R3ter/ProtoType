import addUser from './mutation/AddUser.js'
import CreateMaterial from './mutation/CreateMaterial.js'
import login from './mutation/login.js'
import addUserInfo from './mutation/addUserInfo.js'
import {RefreshToken,logout, loginToken} from './../methods/Tokens.js'
import {ResendActivationCode,checkActivationCode} from './../methods/activate.js'
import uploadUserImage from './mutation/uploadImage.js'
import TeacherAddMaterial from './mutation/Teacher/TeacherAddMaterial.js'
import becomeaTeacher from './mutation/Teacher/becomeATeacher.js'
import addAppointment from './mutation/addAppointment.js'
const Mutation={
    addAppointment,
    becomeaTeacher,
    TeacherAddMaterial,
    addUser,CreateMaterial,login,addUserInfo,uploadUserImage,
    logout:(parent,{userId,refreshToken})=>logout(userId,refreshToken)
    ,refreshToken:(parent,{userId,refreshToken},{prisma})=>RefreshToken(userId,refreshToken,prisma),
    resendActivationCode:(parent,args,{req})=>ResendActivationCode(req.headers.token),
    activateAccount:(parent,{code},{req,prisma})=>checkActivationCode(code,req.headers.token,async({id,role})=>{
        const {
            full_name,
            email,
            phone_number,
            Role
        }=await prisma.user.update({where:{id},
            data:{Active:true}
        })
        const info=await loginToken(id,Role,true,email,phone_number)
        return {result:true,
            authentication:{
              ...info,
              isActive:true,
              full_name,
              email
              ,phone_number
          }}
    },()=>({result:false,error:"invalid code"}))

}
export default Mutation