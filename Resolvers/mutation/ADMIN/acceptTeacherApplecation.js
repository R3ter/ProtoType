import { storeNotification } from "../../../methods/addNotification.js"
import { checkToken } from "../../../methods/Tokens.js"

const teacherAcceptApplecation=async(parent,{teacherId},{prisma,req})=>{
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
                    teacherIsActive:true
                }
            }
        },
        teacher:{
            select:{
                full_name:true,
                id:true
            }
        }
    }).then((e)=>{
        storeNotification({
            elementId:e.id,
            title:`you'r account has been approved!!`,
            body:"check it out!",
            to_full_name:e.teacher.full_name,
            from_full_name:"admin",
            fromId:"admin's id",
            toId:e.teacher.id,
            fromImage:"admin",
            type:"signup"
        })
        return true
    })
}
export default teacherAcceptApplecation