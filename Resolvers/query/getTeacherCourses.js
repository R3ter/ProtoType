import { checkToken } from "../../methods/Tokens.js"

const getTeacherCourses=async(parent, {teacherID}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    console.log(teacherID)
    const materials = await prisma.materials.findMany({
        where:{
            userId:teacherID
        },
        include:{
            lookUp:true,
            description:true,
            tags:{
                select:{
                    lookUp:true
                }
            },
            reviews:{
                select:{
                    User:{
                        select:{
                            userInfo:true
                        }
                    }
                }
            },
            education_level:{
                select:{
                    lookUp:true
                }
            }
        }
    },info)
    return materials.map(async (e)=>{
        return {
            ...e,
            ...await prisma.materialReview.aggregate({
                where:{
                    id:e.id
                  },
                avg:{
                    ratingStars:true
                },
                count:true
              }).then((e)=>({ratingCounts:e.count,averageRating:e.avg.ratingStars}))
        }
    })

}

export default getTeacherCourses