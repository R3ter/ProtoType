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
  var dt = moment(dateTime, "YYYY-MM-DD HH:mm:ss")
    
    // const appointment= await prisma.appointment.findFirst({
    //     where:{
    //         teacherId,
    //         date,time
    //     }
    // })
    // if(appointment){
    //     throw new Error("appointment is already booked")
    // }
    const freeTimes=await prisma.workingDay.findFirst({
        where:{
          teacherId:teacherId,
          day:dt.format('dddd').toLowerCase()
        }
    }).then((e)=>e.hours)
    .catch(()=>false)
    // if(!freeTimes||!freeTimes.includes(moment(dateTime).format("HH:mm"))){
    //     throw new Error("time is not available")
    // }
    return await prisma.appointment.create({
        data:{
            dateTime,
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