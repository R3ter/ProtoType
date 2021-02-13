import {checkToken} from './../../methods/Tokens.js'
import moment from 'moment'

const appAppointment=async(parent,
    {
        data:{
            teacherId,
            dateTime,
            courseId,
            courseHoursType, 
            note,
        }
},{prisma,req},info)=>{
    const {id} = checkToken({token:req.headers.token})
    
    // const appointment= await prisma.appointment.findFirst({
    //     where:{
    //         teacherId,
    //         date,time
    //     }
    // })
    // if(appointment){
    //     throw new Error("appointment is already booked")
    // }
    return await prisma.appointment.create({
        data:{
            date:moment(dateTime).format("DD/MM/YYYY"),note,
            time:moment(dateTime).format("HH:mm"),
            course:{
                connect:{
                    id:courseId
                }
            },
            studentAccepet:true,
            teacherAccepet:false,
            courseHoursType,
            coursePrice:await prisma.education_Level.findUnique({
                where:{
                    education_level:await prisma.materials.findUnique({
                        where:{
                            id:courseId
                        },
                        include:{
                            education_level:true
                        }
                    }).then((e)=>e.education_level.education_level)
                    .catch(()=>{throw new Error("material is not defined")})
                }
            })
            .then((e)=>e[courseHoursType])
            .catch(()=>{throw new Error("education level is not defined")})
            ,
            teacher:{
                connect:{
                    id:teacherId
                }
            },
            user:{
                connect:{
                    id
                }
            }
        }
    }).then(()=>true)
    .catch((e)=>false)
}
export default appAppointment