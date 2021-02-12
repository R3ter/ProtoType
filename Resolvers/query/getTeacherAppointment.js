const getTeacherAppointment=async(parent, {
  teacherID,
  day,month,year
}, {req,prisma}, info)=>{
    return await prisma.appointment.findMany({
        where:{
          teacher:{
            id:teacherID
          },
          day,month,year
        },
        include:{
          course:{
            select:{
              lookUp:true,
              id:true,
              
            }
          },
          user:true,
          teacher:true
        }
      })
}
export default getTeacherAppointment