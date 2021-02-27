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
                    id:true
                }
            }
        }
    }).then((e)=>{
        return e.map((e)=>{
            return {
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