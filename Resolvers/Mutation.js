import addUser from './mutation/AddUser.js'
import CreateMaterial from './mutation/CreateMaterial.js'
import login from './mutation/login.js'
import addUserInfo from './mutation/addUserInfo.js'
import {RefreshToken,logout} from './../methods/Tokens.js'
import {ResendActivationCode} from './../methods/activate.js'
const Mutation={
    addUser,CreateMaterial,login,addUserInfo,
    logout:(parent,{userId,refreshToken})=>logout(userId,refreshToken)
    ,refreshToken:(parent,{userId,refreshToken})=>RefreshToken(userId,refreshToken),
    resendActivationCode:(parent,args,{req})=>ResendActivationCode(req.headers.token)

}
export default Mutation