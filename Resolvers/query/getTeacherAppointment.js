import moment from 'moment'
console.log(moment("2021-02-18T04:00:00.406Z").format("dddd"))
const getTeacherAppointment=async(parent, {
  teacherID,date,timeType
}, {req,prisma}, info)=>{
  
  const appointments=await prisma.appointment.findMany({
    where:{
      date:moment(date).format("dd/mm/yyyy"),
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
      e.hours.map((e)=>{
        const from=e.split("/-/")[0]
        const to=e.split("/-/")[1]
        const From=moment(from ).format("HH:mm a")
        const To=moment(to ).format("HH:mm a")
        var i=From
        while(i<To){
          if(timeType=="oneHour"){
            data.push({from:moment(i,"HH:mm a").format("HH:mm a"),
            to:moment(i,"HH:mm a").add(1,"hour").format("HH:mm a")
          })
          i=moment(i).add(1,"hour").format("HH:mm a")
        }
          else if(timeType=="OneAndHalf"){
            data.push({time:{from:moment(i,"HH:mm a").format("HH:mm a"),
            to:moment(i,"HH:mm a").add(1,"hour").add(30,"minutes").format("HH:mm a")},
            day:e.day,state:0
          })
          i=moment(i).add(1,"hour").add(30,"minutes").format("HH:mm a")
          }
          else if(timeType=="TwoHours"){
            data.push({time:{from:moment(i,"HH:mm a").format("HH:mm a"),
            to:moment(i,"HH:mm a").add(2,"hour").format("HH:mm a")},
            day:e.day,state:0
          })
          i=moment(i).add(2,"hour").format("HH:mm a")
          }
          else if(timeType=="TwoAndHalf"){
            data.push({time:{from:moment(i,"HH:mm a").format("HH:mm a"),
            to:moment(i,"HH:mm a").add(2,"hour").add(30,"minutes").format("HH:mm a")}
            ,day:e.day,state:0
          })
          i=moment(i).add(2,"hour").add(30,"minutes").format("HH:mm a")
          }
          else if(timeType=="ThreeHours"){
            data.push({time:{from:moment(i,"HH:mm a").format("HH:mm a"),
            to:moment(i,"HH:mm a").add(3,"hour").format("HH:mm a")}
            ,day:e.day,state:0
          })
          i=moment(i).add(3,"hour").format("HH:mm a")
          }
          else if(timeType=="ThreeAndHalf"){
            data.push({from:moment(i,"HH:mm a").format("HH:mm a"),
            to:moment(i,"HH:mm a").add(3,"hour").add(30,"minutes").format("HH:mm a")
          })
          i=moment(i).add(3,"hour").add(30,"minutes").format("HH:mm a")
          }
          else if(timeType=="FourHours"){
            data.push({from:moment(i,"HH:mm a").format("HH:mm a"),
            to:moment(i,"HH:mm a").add(4,"hour").format("HH:mm a")
          })
          i=moment(i).add(4,"hour").format("HH:mm a")
          }
        }
        
      })
      return data.map((e)=>{
        return{
          time:{...e}
          ,state:0,
          day:""
        }
      })
    })
}
export default getTeacherAppointment