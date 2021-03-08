import { storeNotification } from "../../../methods/addNotification.js"
import { checkToken } from "../../../methods/Tokens.js"

const addTeacherReview=async(parnet,{
    appointmentId,
    review,
    ratingStars
},{prisma,req},info)=>{
    const {id} = checkToken({token:req.headers.token,Roles:["STUDENT"]})
    await prisma.appointment.findUnique
    return await prisma.teacherReview.upsert({
        where:{
            appoitmentId:appointmentId
        },
        update:{
            review,
            ratingStars
        },
        create:{
            teacherId,
            studentId:id,
            appointmentId,
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
            toId:teacherId,
            fromImage:e.student.userInfo.image_URL,
            type:"review"
        })
        return true
    })
}
export default addTeacherReview