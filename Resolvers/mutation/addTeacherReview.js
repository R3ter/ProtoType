import { checkToken } from "../../methods/Tokens.js"

const addTeacherReview=async(parnet,{
    teacherId,
    review,
    ratingStars
},{prisma,req},info)=>{
    const {id} = checkToken({token:req.headers.token,Roles:["STUDENT"]})
    return await prisma.teacherReview.upsert({
        where:{
            studentAndTeacherId:{
                studentId:id,
                teacherId
            }
        },
        update:{
            review,
            ratingStars
        },
        create:{
            teacherId,
            studentId:id,
            studentAndTeacherId:{
                studentId:id,
                teacherId
            },
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
            title:`${e.teacher.full_name} has rated you for the previous lesson,`,
            body:"Click here to view the his rate.",
            full_name:e.teacher.full_name,
            fromId:id,
            toId:e.student.id,
            fromImage:e.teacher.userInfo.image_URL,
            type:"review"
        })
        return true
    })
}
export default addTeacherReview