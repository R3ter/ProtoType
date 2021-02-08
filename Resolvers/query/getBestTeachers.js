import { checkToken } from "../../methods/Tokens.js"

const getBestTeachers= async(parent, {data}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})

    const teachers= await prisma.teacherProfile.findMany({
        include:{
            user:true,
            description:true,
            reviews :true,

        }
    })
    return teachers.map(async (e)=>{
        return {
            ...e,
            ...await prisma.teacherReview.aggregate({
                where:{
                    TeacherProfile:{
                      id:e.teacherId
                    }
                  },
                avg:{
                    ratingStars:true
                },
                count:true
                }).then((e)=>({ratingCounts:e.count,averageRating:e.avg.ratingStars}))
        }
    })
}
export default getBestTeachers