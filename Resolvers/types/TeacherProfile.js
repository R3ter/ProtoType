const TeacherProfile={
    async description(parent, args, {req}){
        console.log(parent)
        return parent.description[req.headers.lang||"eng"]
    }
}
export default TeacherProfile