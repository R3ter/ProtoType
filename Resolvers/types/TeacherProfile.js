const TeacherProfile={
    async description(parent, {teacherID}, {req}){
        return parent.description[req.headers.lang||"eng"]
    },
    async averageRating(parent, {teacherID}, {prisma}){
        return await prisma.teacherReview.aggregate({
            where:{
                teacherId:teacherID
              },
            avg:{
                ratingStars:true
            }
            }).then((e)=>(e.avg.ratingStars))
    },
    async courseCount(parent, {teacherID}, {prisma}){
        return await prisma.materials.aggregate({
            where:{
                teachers:{
                    some:{
                        id:teacherID
                    }
                }
            },
            count:true
        }).then((e)=>(e.count))
    },
    async ratingCounts(parent, {teacherID}, {prisma}){
        return await prisma.teacherReview.aggregate({
            where:{
                teacherId:teacherID
              },
              count:true
            }).then((e)=>(e.count))

    }
}
export default TeacherProfile