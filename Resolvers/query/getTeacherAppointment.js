import { checkToken } from "../../methods/Tokens.js"
import moment from 'moment'

const checkTime = (times, hours, minutes, appointmentsArray, id,timeType) => {
  const data = []
  times.forEach((e) => {
    const from = e.split("/-/")[0]
    const to = e.split("/-/")[1]

    const From = moment(moment(from).format("HH:mm a"),"HH:mm a")
    const To = moment(moment(to).format("HH:mm a"),"HH:mm a")
    var i = moment(moment(From).format("HH:mm a"),"HH:mm a")

    while (moment(i).isBefore(To)&&
      moment(i).add(hours, "hours").add(minutes, "minutes").format("HH:mm a")
      <= To.format("HH:mm a")) {
        let state = 0
        let skip = false
        appointmentsArray.map((appointments,index)=>{
          if(appointments){
            appointments.from=moment(moment(appointments.from).format("HH:mm a"),"HH:mm a")
            appointments.to=moment(moment(appointments.to).format("HH:mm a"),"HH:mm a")
          }
          if (appointments &&(
            moment(i).isBetween(appointments.from,
            appointments.to) ||
            moment(i).add(hours, "hours").add(minutes, "minutes").subtract(1,"minutes")
            .isBetween(
              appointments.from,
              appointments.to
              )))
              {
                if(appointments.courseHoursType==timeType){
                    data.push({
                      from: moment(appointments.from).format("HH:mm a"),
                      to: moment(appointments.to).format("HH:mm a"),
                      state:appointments.studentId==id?(
                        appointments.state.Appoitment_state_key=="waiting"?
                        2:3
                        ):appointments.state.Appoitment_state_key!="waiting"?
                        1:0
                    })
                  }
                  i = moment(appointments.to)
                  appointmentsArray[index]=null;
                  skip = true
                }
              })
            if (!skip) {
          data.push({
            from: moment(i).format("HH:mm a"),
            to: moment(i).add(hours, "hours").add(minutes, "minutes").format("HH:mm a"),
            state
          })
          i = moment(i).add(hours, "hours").add(minutes, "minutes")
        }
      }
    }
  )
  return data
}

const getTeacherAppointment = async (parent, {
  teacherID, date, timeType
}, { req, prisma }, info) => {
  const { id } = checkToken({ token: req.headers.token })
  const appointments = await prisma.appointment.findMany({
    orderBy: {
      dateTime: 'asc',
    },
    where: {
      date: moment(date).format("DD/MM/YYYY"),
      teacherId: teacherID
    },
    include:{
      state:{
        select:{
          name:true,id:true,color:true,Appoitment_state_key:true
        }
      }
    }
  }).then((e) => {
    return e
  })
  return await prisma.workingDay.findUnique({
    where: {
      teacherIdAndDay: teacherID + moment(date).format('dddd').toLowerCase()
    }
  }).then((e) => {
    if (!e)
      return []
    let times;

    if (timeType == "oneHour" || timeType=="train") {
      times = checkTime(e.hours, 1, 0, appointments, id,"oneHour")
    } else if (timeType == "TwoHours"|| timeType=="package10HomeWorks") {
      times = checkTime(e.hours, 2, 0, appointments, id,"TwoHours")
    } else if (timeType == "ThreeHours"|| timeType=="package15HomeWorks") {
      times = checkTime(e.hours, 3, 0, appointments, id,"ThreeHours")
    }
    else if (timeType == "OneAndHalf") {
      times = checkTime(e.hours, 1, 30, appointments, id,timeType)
    }
    else if (timeType == "TwoAndHalf") {
      times = checkTime(e.hours, 2, 30, appointments, id,timeType)
    }


    return times.map((e) => {
      return {
        time: { from: e.from, to: e.to }
        , state: e.state,
        day: ""
      }
    })
  })
}
export default getTeacherAppointment