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
            review:true,
            student_info:true,
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
    })
       
}

export default getTeacherReviews