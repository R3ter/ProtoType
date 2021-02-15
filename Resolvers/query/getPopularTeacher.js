import { checkToken } from "../../methods/Tokens.js"

const getBestTeachers= async(parent, {skip=0,take=5}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    const tags=await prisma.userInfo.findUnique({where:{
        userId:id
      },include:{
        preferred_materials:true
      }
    }).then((e)=>e.preferred_materials.map((e)=>e.id))
    const teachers= await prisma.teacherProfile.findMany({
        skip,take,
        // where:{
        //     OR:tags.map((e)=>({subjects:{some:{id:e}}}))
        //   },
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
            teacher:e.user,
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