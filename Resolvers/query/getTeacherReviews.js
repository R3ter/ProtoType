import { checkToken } from "../../methods/Tokens.js"

const getTeacherReviews=async(parent, {teacherID}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    
    return await prisma.teacherReview.findMany({
        where:{
            teacherId:teacherID
        },
    }).then(async (e)=>{
        return e.map(async (e)=>{
            return{
                ...e,
                student:await prisma.user.findUnique({
                    where:{
                        id:e.userId
                    },include:{
                        userInfo:true
                    }
                }),
                teacher:await prisma.user.findUnique({
                    where:{
                        id:e.teacherId
                    },include:{
                        userInfo:true
                    }
                })
            }
        })
    })

}

export default getTeacherReviews