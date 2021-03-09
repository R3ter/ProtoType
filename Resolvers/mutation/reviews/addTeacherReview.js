import { storeNotification } from "../../../methods/addNotification.js"
import { checkToken } from "../../../methods/Tokens.js"

const addTeacherReview=async(parnet,{
    appointmentId,
    review,
    ratingStars
},{prisma,req},info)=>{
    const {id} = checkToken({token:req.headers.token,Roles:["STUDENT"]})

    const appointment=await prisma.appointment.findFirst({
        where:{
            id:appointmentId,
            studentId:id
        }
    })
    return await prisma.teacherReview.upsert({
        where:{
            appoitmentId:appointmentId
        },
        update:{
            review,
            ratingStars
        },
        create:{
            teacherId:appointment.teacherId,
            studentId:id,
            appoitmentId:appointmentId,
            review,
            ratingStars
        }
        ,include:{
            student:{
                select:{
                    id:true,
                    full_name:true,
                    userInfo:{
                        select:{
                            image_URL:true
                        }
                    }
                }
            }
        }
    }).then((e)=>{
        storeNotification({
            elementId:e.id,
            title:`${e.student.full_name} has rated you for the previous lesson,`,
            body:"Click here to view the his rate.",
            full_name:e.student.full_name,
            fromId:id,
            toId:appointment.teacherId,
            fromImage:e.student.userInfo.image_URL,
            type:"review"
        })
        return true
    })
}
export default addTeacherReview