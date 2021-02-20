import moment from 'moment'
const getTeacherAppointment=async(parent, {
  teacherID,date,
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
      return e.hours.map((e)=>{
        return {
          time:{
            from:e.split("/-/")[0],
            to:e.split("/-/")[1]
          },
          state:appointments.filter(f => {
            return f.time==e
          }).length,
          day:moment(date).format('dddd').toLowerCase()
        }
      })
    })
}
export default getTeacherAppointment