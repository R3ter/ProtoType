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
            studentCount
        }
    },{prisma,req},info)=>{
        const {id} = checkToken({token:req.headers.token})
        if(studentCount>4||studentCount<1){
            throw new Error("Max 4 students")
        }
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
        const appointments = await prisma.appointment.findMany({
            where:{
                date:moment(dateTime).format("DD/MM/YYYY")
            }
        })
        freeTimes.forEach(e => {
            const times=e.split("/-/") 
            const date=moment(dateTime)
            const from=moment(times[0])
            const to=moment(times[1])
            if(moment(date,"HH:mm a").isBetween(
                moment(from,"HH:mm a"),moment(to,"HH:mm a"),null,"()"
                )&&moment(date,"HH:mm a").add(
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
                        ).isBetween(
                            moment(from,"HH:mm a"),
                            moment(to,"HH:mm a"),null,"()"
                    )){
                    timeIsFree=true
                }
            });
            if(!timeIsFree){
                return false
            }
            appointments.forEach((e)=>{
                if(moment(dateTime).isBetween(
                    moment(e.from)
                    ,moment(e.to),undefined,"[]")||
                    moment(dateTime).add(
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
                            ).isBetween(
                        moment(e.from)
                        ,moment(e.to),undefined,"[]")){
                            timeIsFree=false
                    }
            })
            if(!timeIsFree){
                return false
            }
            return await prisma.appointment.create({
                data:{
                    studentCount,
                    dateTime:dateTime,
                    date:moment(dateTime).format("DD/MM/YYYY"),note,
                    from:moment(dateTime).format(),
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
                            ).format(),
                            materialsId:courseId,
                            courseHoursType,
                            ...await prisma.education_Level.findUnique({
                                where:{
                                    id:await prisma.materials.findUnique({
                                        where:{
                                            id:courseId,
                                            // teachersID:{
                                                //     has:teacherId
                                                //   }
                                            }
                                        }).then((e)=>e.education_LevelId)
                                        .catch((e)=>{
                                            throw new Error("material is not defined")})
                                        }
                                    })
                                    .then((e)=>(
                                        {coursePrice:e[courseHoursType]*studentCount
                                            -(e[courseHoursType]*
                                                ((studentCount*10)+(10*(studentCount-2)))/100),
                                                
                                                discountPercentage:e[courseHoursType]*
                                                ((studentCount*10)+(10*(studentCount-2)))/100
                                            })
                                            ).catch((e)=>{
                                                throw new Error("education level is not defined")
                                            }),
                                            teacherId,
                                            studentId:id
                                        }
                                    }).then(()=>true)
                                    .catch(()=>false)
                                }
                                export default appAppointment