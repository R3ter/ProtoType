import moment from 'moment'
const getTeacherAppointment=async(parent, {
  teacherID,date,
}, {req,prisma}, info)=>{
  const appointments=await prisma.appointment.findMany({
    where:{
      date,
      teacherId:teacherID
    }
  })
  return await prisma.workingDay.findFirst({
      where:{
        teacherId:teacherID,
        day:moment(date).format('dddd').toLowerCase()
      }
    }).then((e)=>{
      if(!e)
        return []
      return e.hours.map((e)=>{
        return {
          time:e,
          state:appointments.filter(f => {
            console.log(f)
            return f.time==e
          }).length,
          day:moment(date).format('dddd').toLowerCase()
        }
      })
    })
}
export default getTeacherAppointment