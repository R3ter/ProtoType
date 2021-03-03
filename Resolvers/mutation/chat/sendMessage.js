import {checkToken} from './../../../methods/Tokens.js'
import {sendMessage} from './../../../methods/messages/sendMessage.js'
const sendMessageResolver=async (parent,{toId,message,isImage,attachments},{prisma,req})=>{
    const {id,full_name} = checkToken({token:req.headers.token,teacherActivationRequired:true})
    return await sendMessage(id,toId,message,isImage,attachments,full_name).then(()=>true)
}
export default sendMessageResolver