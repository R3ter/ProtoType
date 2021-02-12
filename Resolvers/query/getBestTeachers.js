import { checkToken } from "../../methods/Tokens.js"

const getBestTeachers= async(parent, {data}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})

    const teachers= await prisma.teacherProfile.findMany({
        include:{
            user:{
                select:{
                    id:true,
                    full_name:true,
                    phone_number:true,
                    email:true,
                    userInfo:true
                    
                }
            },
            description:true,
        }
    })
    return teachers.map(async (e)=>{
        return {
            ...e,
            id:e.teacherId,
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
                        userId:e.teacherId
                    },
                    count:true
                }).then((e)=>({courseCount:e.count}))
                
        }
    })
}
export default getBestTeachers