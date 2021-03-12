import moment from "moment"
const {now} = moment
import { checkToken } from "../../../methods/Tokens.js"
const getTeacherReviews=async(parent, {take=5,skip=0,state}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token,Roles:["TEACHER"]})
    
    let filter
    if(state=="PREVIOUS"){
        filter={
            
            adminAccepted:true
            ,
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
                    adminAccepted:true
                },
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
          teacherId:id,
          ...filter
        },
        orderBy:{
            createdAt:"desc"
        },
        include:{
            review:true,
            HomeWorkPackage:true,
            student_info:true,
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
            if(e.state.Appoitment_state_key=="waiting"&&
            state=="PREVIOUS"){
                e.state={
                    id:"this does not come from database",
                    Appoitment_state_key:"Competed",
                    name:{
                        ar:"اكتمل",
                        eng:"Completed"
                    },
                    color:"#006400"
                }
            }
            return {
                packageName:e.HomeWorkPackage?e.HomeWorkPackage.name:null,
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