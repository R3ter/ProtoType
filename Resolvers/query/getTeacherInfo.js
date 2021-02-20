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
                    userInfo:true,
                },
            },
            
        }
    }).then(async(e)=>{
        return {
            ...e,
            ...await prisma.userInfo.findUnique({
                where:{
                    userId:teacherID
                }}
                ),
            ...await prisma.teacherReview.aggregate({
                where:{
                    teacherId:e.teacherId
                  },
                avg:{
                    ratingStars:true
                },
                count:true
                }).then((e)=>({ratingCounts:e.count,averageRating:e.avg.ratingStars})),
                ...await prisma.materials.aggregate({
                    where:{
                        teachers:{
                            some:{
                                teacherId:e.teacherId
                            }
                        }
                    },
                    count:true
                }).then((e)=>({courseCount:e.count}))
        }
    })
    
}

export default getTeacher