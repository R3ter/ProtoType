import moment from 'moment'
const {now}=moment
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
    async studentCount(parent,args,{prisma}){
        return await prisma.appointment.count({
            where:{
                teacherId:parent.teacherId,
                dateTime:{
                    lte:moment(now()).format("YYYY-MM-DD[T]HH:mm:ss[Z]")
                }
                ,stateKey:"accepted"
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