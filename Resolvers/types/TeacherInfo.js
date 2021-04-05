import { checkToken } from "../../methods/Tokens.js"

const getTeacherInfo={
    async canContact(parent,args,{prisma,req}){
        const {id} = checkToken({token:req.headers.token})
        return await prisma.appointment.count({
            where:{
                teacherId:parent.user.id,
                studentId:id,
                stateKey:"accepted"
            }
        }).then((e)=>e>0)

    },
    async studentCount(parent,{teacherId},{prisma,req}){
        const {id} = checkToken({token:req.headers.token})
        return await prisma.appointment.count({
            where:{
                studentId:id,
                teacherId:parent.teacherId
              }
            })
    },
    async ratingCounts(parent,args,{prisma}){
        return await prisma.teacherReview.count({
            where:{
                teacherId:parent.user.id
              }
            })
    },
    schoolTypeName(parent,args,{req}){

        if(parent.educationLevel)
            return parent.educationLevel[0].type.name[req.headers.lang||"eng"]
    },
    education_level_name(parent,args,{req}){
        return parent.educationLevel.map((e)=>(
            e.lookUp[req.headers.lang||"eng"]
        ))
    },
    async averageRating(parent,args,{prisma}){
        return await prisma.teacherReview.aggregate({
            where:{
                teacherId:parent.user.id
              },
            avg:{
                ratingStars:true
            },
            count:true,
    
            }).then((e)=>(e.avg.ratingStars))
    }
}
export default getTeacherInfo
