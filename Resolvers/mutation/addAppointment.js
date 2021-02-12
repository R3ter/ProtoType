import {checkToken} from './../../methods/Tokens.js'
const appAppointment=async(parent,
    {
        data:{
            teacherId,
            time,
            day,
            month,
            year,
            courseId,
            courseHoursType, 
            note,
        }
},{prisma,req},info)=>{
    const {id} = checkToken({token:req.headers.token})
    return await prisma.appointment.create({
        data:{
            day,month,year,note,time,
            course:{
                connect:{
                    id:courseId
                }
            },
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