const Materials={
    async name(parent, args, {req,prisma}){
        return parent.lookUp[req.headers.lang||"eng"]
    }
}
export default Materials