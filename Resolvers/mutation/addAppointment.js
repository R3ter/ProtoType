import {checkToken} from './../../methods/Tokens.js'
import moment from 'moment'
const appAppointment=async(parent,
    {
        data:{
            teacherId,
            dateTime,
            courseId,
            courseHoursType, 
            homeWorkPackageID,
            note,
            studentCount
        }
    },{prisma,req},info)=>{
        const {id} = checkToken({token:req.headers.token})
        if(studentCount>4||studentCount<1){
            throw new Error("Max 4 students")
        }
        if(moment(dateTime).format('mm')!="00" && moment(dateTime).format('mm')!="30"){
            throw new Error("date is not correct!")
        }
        let price={}
        if(courseHoursType!="train"){
            price={
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
        }).then((e)=>{
            return {coursePrice:e[courseHoursType]*studentCount-
                (e[courseHoursType]*
                    ((studentCount*10)+(10*(studentCount-2)))/100),
                    
                    discountPercentage:e[courseHoursType]*
                    ((studentCount*10)+(10*(studentCount-2)))/100
                }}
                )
            }
        }else{
            price={
                ... await prisma.homeWorkPackage.findUnique({
                    where:{
                        id : homeWorkPackageID
                    }
                }).then((e)=>{
                    return {
                        coursePrice:e.price,
                        homeWorkPackageId:e.id
                    }
                }),
            }
        }
        const freeTimes=await prisma.workingDay.findUnique({
            where:{
                teacherIdAndDay:teacherId+moment(dateTime).format('dddd').toLowerCase()
            }
        }).then((e)=>e.hours)
        .catch(()=>[])
        const toHour=moment(dateTime).add(
            (courseHoursType=="oneHour"||
            courseHoursType=="train"||
            courseHoursType=="OneAndHalf")?1:
            (courseHoursType=="TwoHours"||
            courseHoursType=="package10HomeWorks"||
            courseHoursType=="TwoAndHalf")?2:
            (courseHoursType=="ThreeHours"||
            courseHoursType=="package15HomeWorks"||
            courseHoursType=="ThreeAndHalf")?3:
            4,"hours"
            ).add(
                ((courseHoursType=="OneAndHalf"||
                courseHoursType=="TwoAndHalf"||
                courseHoursType=="ThreeAndHalf")?
                30:undefined),"minutes"
                )
        let timeIsFree=false
        const appointments = await prisma.appointment.findMany({
            where:{
                date:moment(dateTime).format("DD/MM/YYYY")
            }
        })
        console.log(appointments)
        freeTimes.forEach(e => {
            const times=e.split("/-/")
            const date=moment(dateTime).format("HH:mm a")
            const from=moment(times[0]).format("HH:mm a")
            const to=moment(times[1]).format("HH:mm a")
            
            if(moment(date,"HH:mm a").isBetween(
                moment(from,"HH:mm a"),moment(to,"HH:mm a"),null,"[]")
                &&moment(toHour.format("HH:mm a"),"HH:mm a").isBetween(
                            moment(from,"HH:mm a"),
                            moment(to,"HH:mm a"),null,"[]"
                    )){
                        timeIsFree=true
                    }
                });
                appointments.forEach((e)=>{
                    if(moment(moment(dateTime).format("HH:mm a"),
                    "HH:mm a").isBetween(
                        moment(moment(e.from).format("HH:mm a"),"HH:mm a")
                        ,moment(moment(e.to).format("HH:mm a"),"HH:mm a")
                        ,null,"[)")||
                        toHour.isBetween(
                            moment(moment(e.from).format("HH:mm a"),"HH:mm a")
                            ,moment(moment(e.to).format("HH:mm a"),"HH:mm a")
                            ,null,"(]")){
                            timeIsFree=false
                    }
            })
            if(!timeIsFree){
               return false
            }
            return await prisma.appointment.create({
                data:{
                    stateKey:"waiting",
                    studentCount,
                    dateTime:dateTime,
                    date:moment(dateTime).format("DD/MM/YYYY"),note,
                    from:moment(dateTime).format("YYYY-MM-DD HH:mm:ss"),
                    to:toHour.format("YYYY-MM-DD HH:mm:ss"),
                    materialsId:courseId,
                    courseHoursType,
                    ...price,                                            
                    teacherId,
                    studentId:id
                }
            }).then(()=>true)
        }
        export default appAppointment