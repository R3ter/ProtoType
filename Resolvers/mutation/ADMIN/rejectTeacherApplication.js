import { storeNotification } from "../../../methods/addNotification.js"
import { checkToken } from "../../../methods/Tokens.js"

const teacherRejectApplecation=async(parent,{teacherId},{prisma,req})=>{
    const {id}=checkToken({token:req.headers.token,Roles:["ADMIN"]})
    if(teacherId=="")
        return false
    return await prisma.user.update({
        where:{
            id:teacherId
            },
        data:{
            teacherProfile:{
                update:{
                    Rejected:true
                }
            }
        }
    }).then((e)=>{
        storeNotification({
            elementId:e.id,
            title:`you'r account has been rejected by admin!!`,
            body:"reupload you'r documents to apply again!",
            to_full_name:e.full_name,
            from_full_name:"admin",
            fromId:"admin's id",
            toId:e.id,
            fromImage:"admin",
            type:"signup"
        })
        return true
    })
}
export default teacherRejectApplecation