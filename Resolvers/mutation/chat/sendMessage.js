import {checkToken} from './../../../methods/Tokens.js'
import {sendMessage} from './../../../methods/messages/sendMessage.js'
const sendMessageResolver=async (parent,{toId,message},{prisma,req})=>{
    const {id} = checkToken({token:req.headers.token,teacherActivationRequired:true})
    return await sendMessage(id,toId,message).then(()=>true).catch(()=>false)
}
export default sendMessageResolver