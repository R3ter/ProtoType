import {checkToken} from './../../methods/Tokens.js'
import moment from 'moment'

import { now } from '../../methods/time.js'
const appAppointment=async(parent,
    {
        data:{
            teacherId,
            dateTime,
            courseId,
            courseHoursType, 
            homeWorkPackageID,
            note,
            studentCount,
            student_info
        }
    },{prisma,req},info)=>{

        const {id} = checkToken({token:req.headers.token})
        if(studentCount>4||studentCount<1){
            throw new Error("Max 4 students")
        }
        if((moment.utc(dateTime).format('mm')!="00" && moment.utc(dateTime).format('mm')!="30")||
        moment.utc(dateTime).isBefore(moment.utc(now()).add(5,"minutes"))
        ){
            throw new Error("date is not correct!")
        }

        let price={}
        if(courseHoursType!="train"){
            console.log(courseHoursType)
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
                teacherIdAndDay:teacherId+moment.utc(dateTime).format('dddd').toLowerCase()
            }
        }).then((e)=>e.hours)
        .catch(()=>[])

        const toHour=moment.utc(dateTime,"YYYY-MM-DDTHH:mm:ss[Z]").add(
            (courseHoursType=="oneHour"||
            courseHoursType=="train"||
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
        let timeIsFree=false
        const appointments = await prisma.appointment.findMany({
            where:{
                date:moment.utc(dateTime).format("DD/MM/YYYY")
            }
        })
        let StopLoop=false
        freeTimes.forEach(e => {
            if(!StopLoop){
                const times=e.split("/-/")
                const date=moment.utc(dateTime).format("HH:mm a")
                const from=moment.utc(times[0]).format("HH:mm a")
                const to=moment.utc(times[1]).format("HH:mm a")
                console.log("dwasd")
                if(moment.utc(date,"HH:mm a").isBetween(
                    moment.utc(from,"HH:mm a"),moment.utc(to,"HH:mm a"),null,"[]")
                    &&moment.utc(toHour.format("HH:mm a"),"HH:mm a").isBetween(
                                moment.utc(from,"HH:mm a"),
                                moment.utc(to,"HH:mm a"),null,"[]"
                        )){
                            timeIsFree=true
                            StopLoop=true
                        }
                }
            });
                if(!timeIsFree){
                    return false
                }
                appointments.forEach((e)=>{
                    if(timeIsFree){
                        if(e.stateKey=="waiting"&&e.studentId==id){
                            timeIsFree=false
                        }else if(e.stateKey!="waiting")
                        if(moment.utc(moment.utc(dateTime).format("HH:mm a"),
                        "HH:mm a").isBetween(
                            moment.utc(moment.utc(e.from).format("HH:mm a"),"HH:mm a")
                            ,moment.utc(moment.utc(e.to).format("HH:mm a"),"HH:mm a")
                            ,null,"[)")||
                            toHour.isBetween(
                                moment.utc(moment.utc(e.from).format("HH:mm a"),"HH:mm a")
                                ,moment.utc(moment.utc(e.to).format("HH:mm a"),"HH:mm a")
                                ,null,"(]")){
                                timeIsFree=false
                        }
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
                    date:moment.utc(dateTime).format("DD/MM/YYYY"),note,
                    from:moment.utc(dateTime,"YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD[T]HH:mm:ss[Z]"),
                    to:moment.utc(toHour,"YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD[T]HH:mm:ss[Z]"),
                    materialsId:courseId,
                    courseHoursType,
                    ...price,
                    teacherId,
                    studentId:id,
                    student_Appointment_infoId:await prisma.student_Appointment_info.create({
                        data:{
                            address:student_info.address,
                            full_number:student_info.full_number,
                            student_name:student_info.student_name
                        }
                    }).then((e)=>e.id)

                }
            }).then(()=>true)
        }
        export default appAppointment