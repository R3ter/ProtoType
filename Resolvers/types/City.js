const City={
    async name(parent, args, {req,prisma}){
        return parent.lookUp[req.headers.lang||"eng"]
    }
}
export default City