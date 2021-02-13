import moment from 'moment'
const getTeacherAppointment=async(parent, {
  teacherID,date,
}, {req,prisma}, info)=>{
  var dt = moment(date, "YYYY-MM-DD HH:mm:ss")
  const appointments=await prisma.appointment.findMany({
    where:{
      date,
      teacherId:teacherID
    }
  })
  return await prisma.workingDay.findFirst({
      where:{
        teacherId:teacherID,
        day:dt.format('dddd').toLowerCase()
      }
    }).then((e)=>{
      console.log(appointments)
      if(!e)
        return []
      return e.hours.map((e)=>{
        return {
          time:e,
          state:appointments.filter(f => {
            return f.time==e
          }).length,
          day:dt.format('dddd').toLowerCase()
        }
      })
    })
}
export default getTeacherAppointment