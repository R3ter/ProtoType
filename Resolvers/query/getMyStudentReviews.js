import { checkToken } from "../../methods/Tokens.js"

const getMyReviews=async(parent,{skip,take},{prisma,req})=>{
    const {id} = checkToken({token:req.headers.token,Roles:["STUDENT"]})
    return await prisma.teacherReview.findMany({
        take,skip,
        where:{
            studentId:id
        },
        include:{
            teacher:{
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
                teacher:{
                    id:e.teacher.id,
                    name:e.teacher.full_name,
                    image_URL:e.teacher.userInfo.image_URL
                },
                review:e.review,
                createdAt:e.createdAt,
                ratingStars:e.ratingStars
            }
        })
    })
}
export default getMyReviews