const getMaterialTeachers=async(parent,{materialID,skip=0,take=5},{prisma,req})=>{
    return await prisma.materials.findUnique({
        where:{
            id:materialID
        },include:{
            teachers:{
                where:{
                    teacherIsActive:true
                },
                skip,take,
                select:{
                    full_name:true,
                    id:true,
                    userInfo:{
                        select:{
                            about:true,
                            longitude:true,
                            latitude:true,
                            image_URL:true,
                            cover_URL:true,
                            about:true
                        }
                    }
                }
            }
        }
    }).then(e=>e.teachers.map(async (e)=>{
        return {
        ...e,
        teacherProfile:{
            ...e.teacherProfile,
            ...await prisma.teacherReview.aggregate({
                where:{
                    teacherId:e.id
                },
                avg:{
                    ratingStars:true
                },
                count:true,
            }).then((e)=>({ratingCounts:e.count,averageRating:e.avg.ratingStars})),
            ...await prisma.materials.aggregate({
                where:{
                    teachers:{
                        some:{
                            id:e.teacherId
                        }
                    }
                },
                count:true
            }).then((e)=>({courseCount:e.count}))
        }}
    }
))
}
export default getMaterialTeachers