import { checkToken } from "../../methods/Tokens.js"
import moment from 'moment'

const checkTime = (times, hours, minutes, appointments, id,timeType) => {
  const data = []
  times.forEach((e) => {
    const from = e.split("/-/")[0]
    const to = e.split("/-/")[1]

    const From = moment(from)
    const To = moment(to)
    var i = moment(From)
    let appointmentCount=0;

    while (moment(i).isBefore(To)&&
      moment(i).add(hours, "hours").add(minutes, "minutes").format("HH:mm a")
      <= To.format("HH:mm a")) {
        let state = 0;
        let skip = false


        if (appointments[appointmentCount]&&(
          moment(i).isBetween(moment(appointments[appointmentCount].from),
          moment(appointments[appointmentCount].to)) ||
          moment(i).add(hours, "hours").add(minutes, "minutes").subtract(1,"minutes")
          .isBetween(
            moment(appointments[appointmentCount].from),
            moment(appointments[appointmentCount].to)
            )))
            {
              if(appointments[appointmentCount] &&
                appointments[appointmentCount].courseHoursType==timeType){
                  data.push({
                    from: moment(appointments[appointmentCount].from).format("HH:mm a"),
                    to: moment(appointments[appointmentCount].to).format("HH:mm a"),
                    state:appointments[appointmentCount].studentId==id?2:1
                  })
                }
              i = moment(appointments[appointmentCount].to)
              appointmentCount++;
              skip = true
            }
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
    where: {
      date: moment(date).format("DD/MM/YYYY"),
      teacherId: teacherID
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

    if (timeType == "oneHour") {
      times = checkTime(e.hours, 1, 0, appointments, id,timeType)
    } else if (timeType == "TwoHours") {
      times = checkTime(e.hours, 2, 0, appointments, id,timeType)
    } else if (timeType == "ThreeHours") {
      times = checkTime(e.hours, 3, 0, appointments, id,timeType)
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