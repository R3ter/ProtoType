const CourseTag={
    async name(parent, args, {req}){
        return parent.lookUp[req.headers.lang||"eng"]
    }
}
export default CourseTag