import moment from 'moment'
const {now}=moment
import {checkToken} from './../../methods/Tokens.js'
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
    schoolTypeName(parent,args,{req}){
        if(parent.educationLevel)
        return parent.educationLevel[0].type.name[req.headers.lang||"eng"]
    },
    education_level_name(parent,args,{req}){
        return parent.educationLevel.map((e)=>(
            e.lookUp[req.headers.lang||"eng"]
        ))
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
    async paymentsCount(parent,args,{prisma,req}){
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.payment.count({
            where:{
                Appointment:{
                    teacherId:parent.teacherId
                }
            }})
    },
    async acceptedAppointmentsCount(parent,args,{prisma,req}){
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.appointment.count({
            where:{
                teacherId:parent.teacherId,
                stateKey:"accepted"
            }
        })
    },
    async rejectedAppointmentsCount(parent,args,{prisma,req}){
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.appointment.count({
            where:{
                teacherId:parent.teacherId,
                stateKey:"rejected"
            }
        })
    },
    async totalPayment(parent,args,{prisma,req}){
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.appointment.aggregate({
            sum:{
                coursePrice:true
            },
            where:{
                teacherId:parent.teacherId,
                stateKey:"accepted"
            }
        }).then((e)=>{
            return e.sum.coursePrice
        })
    },
    async totalPaidAmount(parent,args,{prisma,req}){
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.appointment.aggregate({
            sum:{
              coursePrice:true
            },
            where:{
                teacherId:parent.teacherId,
              payment:{
                isNot:null
              }
            }
          }).then((e)=>{
            return e.sum.coursePrice
          })
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