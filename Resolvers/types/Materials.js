const Materials={
    async name(parent, args, {req}){
        return parent.lookUp[req.headers.lang||"eng"]
    }
}
export default Materials