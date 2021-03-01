import {checkToken} from './../../methods/Tokens.js'
import moment from 'moment'
const appAppointment=async(parent,
    {
        data:{
            dateTime,
            courseId,
            courseHoursType, 
            homeWorkPackageID,
            studentCount
        }
    },{prisma,req},info)=>{
        const {id} = checkToken({token:req.headers.token})
        if(studentCount>4||studentCount<1){
            throw new Error("Max 4 students")
        }
        if(moment.utc(dateTime).format('mm')!="00" && moment.utc(dateTime).format('mm')!="30"){
            throw new Error("date is not correct!")
        }
        let price={}
        if(courseHoursType!="train"){
            price={
                ...await prisma.education_Level.findUnique({
                where:{
                    id:await prisma.materials.findUnique({
                        where:{
                            id:courseId
                            }
                        }).then((e)=>e.education_LevelId)
                        .catch((e)=>{
                            throw new Error("material is not defined")})
                        }
        }).then((e)=>(
            {coursePrice:e[courseHoursType],
                priceBeforeDiscount:e[courseHoursType]*studentCount,
                    finalPrice:(e[courseHoursType]*studentCount)-
                    (e[courseHoursType]*
                        ((studentCount*10)+(10*(studentCount-2)))/100),

                        
                    discountPercentage:e[courseHoursType]*
                    ((studentCount*10)+(10*(studentCount-2)))/100
                })
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
                        priceBeforeDiscount:e.price,
                        coursePrice:e.price,
                        finalPrice:e.price,
                        discountPercentage:0,
                        homeWorkPackageId:e.id,
                        homeWorkPackage:e.name,
                        studentsCount:studentCount
                    }
                }),
            }
        }
        
        const toHour=moment.utc(dateTime).add(
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
                
            return {
                date:moment.utc(dateTime).format("DD/MM/YYYY"),
                from:moment.utc(dateTime).format("HH:mm a"),
                to:toHour.format("HH:mm a"),
                ...price,
                TaxPercentage:0

            }
        }
        export default appAppointment