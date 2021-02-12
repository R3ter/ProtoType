const getTeacherAppointment=async(parent, {
  teacherID,date,
}, {req,prisma}, info)=>{
    return await prisma.appointment.findMany({
        where:{
          teacher:{
            id:teacherID
          },
          date
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