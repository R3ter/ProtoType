import moment from 'moment'
const {now}=moment
import { checkToken } from "../../methods/Tokens.js"
const getTeacherReviews=async(parent, {take=5,skip=0,state}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token,Roles:["STUDENT"]})
    let filter
    if(state=="PREVIOUS"){
        filter={
            OR:[
                {
                    dateTime:{
                        lte:moment(now()).format("YYYY-MM-DD[T]HH:mm:ss[Z]")
                    }
                },{
                    stateKey:"rejected"
                }
            ]
        }
    }else{
        filter={
            AND:[
                {
                    dateTime:{
                        gte:moment(now()).format("YYYY-MM-DD[T]HH:mm:ss[Z]")
                    }
                },{
                    NOT:{
                        stateKey:{
                            equals:"rejected"
                        }
                    }
                }
            ]
        }
    }
    return await prisma.appointment.findMany({
        take,skip,
        where:{
          studentId:id,
          ...filter
        },
        orderBy:{
            createdAt:"desc"
        },
        include:{
            teacher:{
                select:{
                    id:true,
                    full_name:true,
                    teacherProfile:true
                }
            },
            course:{
                select:{
                    id:true,
                    lookUp:true,
                    description:true,
                    education_level:{
                        select:{
                            lookUp:true,
                            id:true
                        }
                    }
                }
            },
            state:{
                select:{
                    name:true,
                    color:true,
                    id:true,
                    Appoitment_state_key:true
                }
            }
        }
    }).then((e)=>{
        return e.map(async(e)=>{
           console.log(e.teacher.teacherProfile.teacherId)
            const studentReview=await prisma.teacherReview.count({
                where: {
                    studentId:e.studentId,
                    teacherId:e.teacherId
                },
            })
            return {
                isReview:studentReview>0,
                ...e,
                time:{
                    from:e.from,
                    to:e.to
                },
                teacher:{
                ...e.teacher,
                    teacherProfile:{
                        ...await prisma.teacherReview.aggregate({
                            where:{
                                teacherId:e.teacher.teacherProfile.teacherId
                              },
                            avg:{
                                ratingStars:true
                            },
                            count:true
                            }).then((e)=>{
                                 return{ratingCounts:e.count,averageRating:e.avg.ratingStars}
                                }),
                            ...await prisma.materials.aggregate({
                                where:{
                                    teachers:{
                                        some:{
                                            id:e.teacher.teacherProfile.teacherId
                                        }
                                    }
                                },
                                count:true
                            }).then((e)=>({courseCount:e.count}))
                }
                }
            }
        })
    })
}

export default getTeacherReviews