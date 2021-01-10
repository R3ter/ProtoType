const Materials={
    async name(parent, args, {req,prisma}){
        return await prisma.lookUp.findUnique({where:{id:parent.lookUpId}}).then((e)=>{
          return e[req.headers.lang]
         })
    }
}
export default Materials