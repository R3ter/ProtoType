import { checkToken } from "../../../methods/Tokens.js"

const getTeacherReviews=async(parent, {skip=0,take=5}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token,Roles:["TEACHER"]})
    
    return await prisma.teacherReview.findMany({
        skip,take,
        where:{
            teacherId:id
        },
        include:{
            student:{
                select:{
                    full_name:true,
                    id:true,
                    userInfo:{
                        select:{
                            image_URL:true
                        }
                    }
                }
            }
        }
    }).then((e)=>{
        return e.map((e)=>{
            return {
                student:{
                    id:e.student.id,
                    image:e.student.userInfo.image_URL,
                    name:e.student.full_name
                },
                appoitmentId:e.appoitmentId,
                createdAt:e.createdAt,
                ratingStars:e.ratingStars,
                review:e.review
            }

        })
    })
}
export default getTeacherReviews