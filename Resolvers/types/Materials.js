const Materials={
    async name(parent, args, {req}){
        return parent.lookUp[req.headers.lang||"eng"]
    },
    schoolType(parent,args,{req}){
        if(parent.education_level)
        return parent.education_level.type.name[req.headers.lang||"eng"]
    },
    education_level_name(parent,args,{req}){
        if(parent.education_level)
        return parent.education_level.lookUp[req.headers.lang||"eng"]
    },
    async description(parent, args, {req}){
        return parent.description[req.headers.lang||"eng"]
    },
    async teachersCount(parent, args, {req,prisma}){
        return await prisma.user.aggregate({
            where:{
                Materials:{
                    some:{
                        id:parent.id
                    },
                },
                teacherProfile:{
                    teacherIsActive:true
                }
            },
            count:true
        }).then((e)=>(e.count))
    }
}
export default Materials