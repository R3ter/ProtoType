import moment from 'moment'
const getTeacherAppointment=async(parent, {
  teacherID,date,
}, {req,prisma}, info)=>{
  console.log(date)
  var dt = moment(date, "YYYY-MM-DD HH:mm:ss")
  return{
    appointments:await prisma.appointment.findMany({
      where:{
        date,
        teacherId:teacherID
      }
    }),
    availableTime:await prisma.workingDay.findFirst({
      where:{
        teacherId:teacherID,
        day:dt.format('dddd').toLowerCase()
      }
    }).then((e)=>e.hours)
    .catch(()=>[])
  }
}
export default getTeacherAppointment