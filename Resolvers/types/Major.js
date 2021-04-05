const Major={
    name(parent,args,{req}){
        return parent.name[req.headers.lang||"eng"]
    }
}

export default Major