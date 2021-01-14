const education_Level={
    async name(parent, args, {req}){
        return parent.lookUp[req.headers.lang||"eng"]
    }
}
export default education_Level