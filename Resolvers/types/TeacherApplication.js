const TeacherApplication ={
    schoolTypeName(parent,args,{req}){
        if(parent.educationLevel)
            return parent.educationLevel[0].type.name[req.headers.lang||"eng"]
    }
}
export default TeacherApplication