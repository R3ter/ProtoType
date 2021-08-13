import { checkToken } from "../../../methods/Tokens.js"
import moment from 'moment'
const getAppointmentsForAdmin=async(parent,{skip=0,take=10,date,stateKey,teacherId},{prisma,req})=>{
    if(date){
       date=moment.utc(date).format("DD/MM/YYYY")
    }
    if(stateKey=="all"){
        stateKey=undefined
    }
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.appointment.findMany({
        skip,take,
        where:{
            date,stateKey,teacherId
        },
    orderBy:{
        createdAt:"desc"
    },
    include:{
        review:true,
        teacher:{
            select:{
                phone_number:true,
                email:true,
                id:true,
                full_name:true,
                teacherProfile:true,
                userInfo:true
            }
        },
        student_info:true,
        student:{
            select:{
                phone_number:true,
                email:true,
                id:true,
                full_name:true,
                userInfo:true
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
export default getAppointmentsForAdmin