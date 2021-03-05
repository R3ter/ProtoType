import { checkToken } from "../../../methods/Tokens.js"

const teacherAcceptApplecation=async(parent,{teacherId},{prisma,req})=>{
    const {id}=checkToken({token:req.headers.token,Roles:["ADMIN"]})

    return !!await prisma.user.update({
        where:{
            id:teacherId
            },
        data:{
            teacherProfile:{
                update:{
                    teacherIsActive:true
                }
            }
        }
    })
}
export default teacherAcceptApplecation