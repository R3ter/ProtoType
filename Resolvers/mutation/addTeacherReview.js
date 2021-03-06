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
    }).then(()=>true)
}
export default addTeacherReview