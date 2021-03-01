import { now } from "../../../methods/time.js"
import { checkToken } from "../../../methods/Tokens.js"
const getTeacherReviews=async(parent, {take=5,skip=0,state}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    let filter
    if(state=="PREVIOUS"){
        filter={
            OR:[
                {
                    dateTime:{
                        lte:now()
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
                        gte:now()
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
          teacherId:id,
          ...filter
        },
        orderBy:{
            createdAt:"desc"
        },
        include:{
            HomeWorkPackage:true,
            student:{
                select:{
                    id:true,
                    full_name:true,
                    userInfo:true,
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
                    Appoitment_state_key:true,
                    name:true,
                    color:true,
                    id:true
                }
            }
        }
    }).then((e)=>{

        return e.map(async(e)=>{
            const studentReview=await prisma.teacherReview.count({
                where: {
                    userId:e.studentId,
                    teacherId:e.teacherId
                },
            })
            return {
                packageName:e.HomeWorkPackage?e.HomeWorkPackage.name:null,
                isReview:studentReview>0,
                ...e,
                time:{
                    from:e.from,
                    to:e.to
                }
            }
        })
    })
}

export default getTeacherReviews