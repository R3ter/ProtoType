import { checkToken } from "../../methods/Tokens.js"
import moment from 'moment'
const getTeacherAppointment=async(parent, {
  teacherID,date,timeType
}, {req,prisma}, info)=>{
  const {id}=checkToken({token:req.headers.token})
  
  const appointments=await prisma.appointment.findMany({
    where:{
      date:moment(date).format("DD/MM/YYYY"),
      teacherId:teacherID
    }
  }).then((e)=>{
    return e
  })
  return await prisma.workingDay.findUnique({
    where:{
      teacherIdAndDay:teacherID+moment(date).format('dddd').toLowerCase()
    }
    }).then((e)=>{
    if(!e)
        return []
      var data=[]
      let x=0
      e.hours.map((e)=>{
        const from=e.split("/-/")[0]
        const to=e.split("/-/")[1]
        const From=moment(from).format("HH:mm a")
        const To=moment(to).format("HH:mm a")
        var i=From
        while(i<To){
          if(appointments[x]&&i<=appointments[x].from){
            data.push({from:moment(appointments[x].from,"HH:mm a").format("HH:mm a"),
            to:moment(appointments[x].to,"HH:mm a").format("HH:mm a"),
            state:appointments[x].studentId==id?2:1
          })
          i=moment(appointments[x].to,"HH:mm a").format("HH:mm a")
          
          x++;
          continue
          }
          
          if(timeType=="oneHour"||timeType=="TwoHours"||timeType=="ThreeHours"
          ||timeType=="FourHours"){
            if(moment(i,"HH:mm a").format("mm")!="00"){
              i=moment(i,"HH:mm a").add(30,"minutes").format("HH:mm a")
            }
          }

          if(timeType=="oneHour"){
            if(moment(i,"HH:mm a").add(1,"hours").format("HH:mm a")>To){
              break
            }
            data.push({from:moment(i,"HH:mm a").format("HH:mm a"),
              to:moment(i,"HH:mm a").add(1,"hours").format("HH:mm a")})
            i=moment(i,"HH:mm a").add(1,"hours").format("HH:mm a")
          }
          else if(timeType=="TwoHours"){
            if(moment(i,"HH:mm a").add(2,"hours").format("HH:mm a")>To){
              break
            }
            data.push({from:moment(i,"HH:mm a").format("HH:mm a"),
              to:moment(i,"HH:mm a").add(2,"hours").format("HH:mm a")})
            i=moment(i,"HH:mm a").add(2,"hours").format("HH:mm a")
          }
          else if(timeType=="ThreeHours"){
            if(moment(i,"HH:mm a").add(3,"hours").format("HH:mm a")>To){
              break
            }
            data.push({from:moment(i,"HH:mm a").format("HH:mm a"),
              to:moment(i,"HH:mm a").add(3,"hours").format("HH:mm a")})
            i=moment(i,"HH:mm a").add(3,"hours").format("HH:mm a")
          }
          else if(timeType=="FourHours"){
            if(moment(i,"HH:mm a").add(4,"hours").format("HH:mm a")>To){
              break
            }
            data.push({from:moment(i,"HH:mm a").format("HH:mm a"),
              to:moment(i,"HH:mm a").add(4,"hours").format("HH:mm a")})
            i=moment(i,"HH:mm a").add(4,"hours").format("HH:mm a")
          }
          else if(timeType=="OneAndHalf"){
            if(moment(i,"HH:mm a").add(1,"hours").add(30,"minutes").format("HH:mm a")>To){
              break
            }
            data.push({from:moment(i,"HH:mm a").add(30,"minutes").format("HH:mm a"),
              to:moment(i,"HH:mm a").add(1,"hours").format("HH:mm a")})
            i=moment(i,"HH:mm a").add(1,"hours").add(30,"minutes").format("HH:mm a")
          }
          else if(timeType=="TwoAndHalf"){
            if(moment(i,"HH:mm a").add(2,"hours").add(30,"minutes").format("HH:mm a")>To){
              break
            }
            data.push({from:moment(i,"HH:mm a").add(30,"minutes").format("HH:mm a"),
              to:moment(i,"HH:mm a").add(2,"hours").format("HH:mm a")})
            i=moment(i,"HH:mm a").add(2,"hours").add(30,"minutes").format("HH:mm a")
          }
          else if(timeType=="ThreeAndHalf"){
            if(moment(i,"HH:mm a").add(3,"hours").add(30,"minutes").format("HH:mm a")>To){
              break
            }
            data.push({from:moment(i,"HH:mm a").add(30,"minutes").format("HH:mm a"),
              to:moment(i,"HH:mm a").add(3,"hours").format("HH:mm a")})
            i=moment(i,"HH:mm a").add(3,"hours").add(30,"minutes").format("HH:mm a")
          }
        }
      })
      console.log(data)
      return data.map((e)=>{
        return{
          time:{from:e.from,to:e.to}
          ,state:(e.state)==undefined?0:e.state,
          day:""
        }
      })
    })
}
export default getTeacherAppointment