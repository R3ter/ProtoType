export default {
    school_name(parent,args,{req}){
        if(parent.education_level)
        return parent.education_level.type.name[req.headers.lang||"eng"]
    },
    education_level_name(parent,args,{req}){
        if(parent.education_level)
        return parent.education_level.lookUp[req.headers.lang||"eng"]
    },
}