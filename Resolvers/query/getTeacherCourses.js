import { checkToken } from "../../methods/Tokens.js"

const getTeacherCourses=async(parent, {teacherID,take=6,skip=0}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    const materials = await prisma.materials.findMany({
        take,skip,
        where:{
            teachers:{
                some:{
                    id:teacherID
                }
            }
        },include:{
            lookUp:true,
            description:true,
            tags:{
                select:{
                    lookUp:true,
                    id:true
                }
            },
            education_level:{
                select:{
                    id:true,
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