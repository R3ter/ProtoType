import { checkToken } from "../../methods/Tokens.js"

const getTeacherReviews=async(parent, {teacherID}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    
    return await prisma.teacherReview.findMany({
        where:{
            teacherId:teacherID
        },
        include:{
            user:{
                select:{
                    userInfo:true
                }
            }
        }
    })

}

export default getTeacherReviews