import { checkToken } from "../../methods/Tokens.js"

const getTeacher=async(parent, {teacherID}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    return await prisma.teacherProfile.findUnique({
        where:{
            teacherId:teacherID
        },
        include:{
            user:{
                select:{
                    full_name:true,
                    email:true,
                    phone_number:true,
                    userInfo:true
                }
            },
            description:true
        }
    }).then(async(e)=>{
        return {
            ...e,
            ...await prisma.teacherReview.aggregate({
                where:{
                    TeacherProfile:{
                        teacherId:teacherID
                    }
                    },
                avg:{
                    ratingStars:true
                },
                count:true
            })
        }
    })
    
}

export default getTeacher