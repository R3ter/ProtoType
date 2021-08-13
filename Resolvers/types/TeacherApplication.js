const TeacherApplication = {
    schoolTypeName(parent,args,{req}){
        if(parent.educationLevel&&parent.educationLevel[0])
            return parent.educationLevel[0].type.name[req.headers.lang||"eng"]
    },
    async studentCount(parent,args,{prisma}){
        return await prisma.appointment.count({
            where:{
                teacherId:parent.id
                ,stateKey:"accepted"
              }
            })
    },
}
export default TeacherApplication