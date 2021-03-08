const TeacherProfile={
    async description(parent, {teacherID}, {req}){
        return parent.description[req.headers.lang||"eng"]
    },
    async ratingCounts(parent,args,{prisma}){
        return await prisma.teacherReview.count({
            where:{
                teacherId:parent.teacherId
              }
            })
    },
    async averageRating(parent,args,{prisma}){
        return await prisma.teacherReview.aggregate({
            where:{
                teacherId:parent.teacherId
              },
            avg:{
                ratingStars:true
            },
            count:true,
    
            }).then((e)=>(e.avg.ratingStars))
    },
    async courseCount(parent,args,{prisma}){
        return await prisma.materials.count({
            where:{
                teachers:{
                    some:{
                        id:parent.teacherId
                    }
                }
            }
        })
    }
}
export default TeacherProfile