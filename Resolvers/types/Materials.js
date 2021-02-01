const Materials={
    async name(parent, args, {req}){
        return parent.lookUp[req.headers.lang||"eng"]
    },
    async description(parent, args, {req}){
        return parent.description[req.headers.lang||"eng"]
    }
}
export default Materials