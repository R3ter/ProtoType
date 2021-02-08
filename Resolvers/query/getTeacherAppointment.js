const getTeacherAppointment=async(parent, {teacherID}, {req,prisma}, info)=>{
    return await prisma.appointment.findMany({
        where:{
          teacher:{
            id:teacherID
          }
        },
        include:{
          user:true,
          teacher:true
        }
      })
}
export default getTeacherAppointment