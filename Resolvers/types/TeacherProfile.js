const TeacherProfile={
    async description(parent, {teacherID}, {req}){
        return parent.description[req.headers.lang||"eng"]
    }
    ,
    async averageRating(parent, {teacherID}, {prisma}){
        if(!parent.averageRating)
            return await prisma.teacherReview.aggregate({
                where:{
                    teacherId:teacherID
                },
                avg:{
                    ratingStars:true
                }
                }).then((e)=>(e.avg.ratingStars))
            return parent.averageRating
    },
    async courseCount(parent, {teacherID}, {prisma}){
        if(!parent.courseCount)
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
        return parent.courseCount
    },
    async ratingCounts(parent, {teacherID}, {prisma}){
        if(!parent.ratingCounts)
            return await prisma.teacherReview.aggregate({
                where:{
                    teacherId:teacherID
                },
                count:true
                }).then((e)=>(e.count))
            return parent.ratingCounts

    }
}
export default TeacherProfile