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
import addTeacherWorkTimes from './mutation/Teacher/addTeacherFreeTime.js'
import editProfileInfo from './mutation/editProfileInfo.js'
import changeMyPassword from "./mutation/changePassword.js"
import addMaterialRevew from './mutation/reviews/addMaterialReview.js'
import teacherConnectToMaterial from './mutation/Teacher/connectToMaterial.js'
import sendMessage from './mutation/chat/sendMessage.js'
import teacherAcceptAppointment from './mutation/Teacher/teacherAcceptAppointment.js'
import rejectAppointment from "./mutation/Teacher/rejectAppointment.js"
import addTeacherDocument from './mutation/Teacher/addTeacherDocuments.js'
import addTeacherInfo from './mutation/Teacher/addTeacherInfo.js'
import setNotifificationToken from "./mutation/chat/setNotifificationToken.js"
import adminAcceptAppointment from "./mutation/ADMIN/acceptAppointment.js"
import adminRejectAppointment from './mutation/ADMIN/rejectAdminAppoitment.js'
const Mutation={
    adminRejectAppointment,
    adminAcceptAppointment,
    setNotifificationToken,
    addTeacherInfo,
    addTeacherDocument,
    rejectAppointment,
    teacherAcceptAppointment,
    sendMessage,
    teacherConnectToMaterial,
    addMaterialRevew,
    changeMyPassword,
    editProfileInfo,
    addTeacherWorkTimes,
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
        const info=await loginToken({userid:id,role:Role,Activate:true,email,phone_number})
        return {result:true,
            authentication:{
              ...info,
              isActive:true,
              full_name,
              isInfoComplet:false,
              materialSet:false,
              email
              ,phone_number
          }}
    },()=>({result:false,error:"invalid code"}))

}
export default Mutation