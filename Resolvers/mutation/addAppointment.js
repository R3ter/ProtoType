import {checkToken} from './../../methods/Tokens.js'
import moment from 'moment'

console.log(
    moment("01:30","hh:mm").isBetween(
        moment("01:00","hh:mm"),
        moment("02:00","hh:mm")
    )
)

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

    if(moment(dateTime).format('mm')!="00"&&moment(dateTime).format('mm')!="30"){
        throw new Error("date is not correct!")
    }
    const freeTimes=await prisma.workingDay.findUnique({
        where:{
            teacherIdAndDay:teacherId+moment(dateTime).format('dddd').toLowerCase()
        }
    }).then((e)=>e.hours)
    .catch(()=>[])
    let timeIsFree=false
    freeTimes.forEach(e => {
        const times=e.split("/-/")

        if(moment(moment(dateTime).format("HH:mm A"),"HH:mm A").isBetween(
         
            moment(     moment(times[0]).format("HH:mm A"),"HH:mm A")
            ,
       
            
            moment(     moment(times[1]).format("HH:mm A"),"HH:mm A"),null,"[)"
        )){
            timeIsFree=true
        }
    });
    if(!timeIsFree){
        return false
    }
    return await prisma.appointment.create({
        data:{
            dateTime,
            date:moment(dateTime).format("DD/MM/YYYY"),note,
            from:moment(dateTime).format("HH:mm"),
            to:moment(dateTime).add(
                (courseHoursType=="oneHour"||
                courseHoursType=="OneAndHalf")?1:
                (courseHoursType=="TwoHours"||
                courseHoursType=="TwoAndHalf")?2:
                (courseHoursType=="ThreeHours"||
                courseHoursType=="ThreeAndHalf")?3:
                4,"hours"
            ).add(
                ((courseHoursType=="OneAndHalf"||
                courseHoursType=="TwoAndHalf"||
                courseHoursType=="ThreeAndHalf")?
                30:undefined),"minutes"
            )
            .format("HH:mm"),
            materialsId:courseId,
            courseHoursType,
            coursePrice:await prisma.education_Level.findUnique({
                where:{
                    education_level:await prisma.materials.findFirst({
                        where:{
                            id:courseId,
                            teachersID:{
                                has:teacherId
                              }
                        },
                        include:{
                            education_level:true
                        }
                    }).then((e)=>e.education_level.education_level)
                    .catch((e)=>{
                        console.log(e)
                        throw new Error("material is not defined")})
                }
            })
            .then((e)=>e[courseHoursType])
            .catch(()=>{throw new Error("education level is not defined")})
            ,
            teacherId,
            studentId:id
        }
    }).then(()=>true)
    .catch(()=>false)
}
export default appAppointment