export default async(parent,{studentId},{prisma,req})=>{
    return await prisma.appointment.findMany({
        where:{
            studentId
        },
        include:{
            course:{
                select:{
                    lookUp:true,
                    id:true,
                    image_URL:true,
                    teachers:true,
                    education_level:{
                        select:{
                            lookUp:true,
                            id:true,
                            type:{
                                select:{
                                    name:true,
                                    id:true
                                }
                            }

                        }
                    }
                }
            }
        }
    }).then((e)=>{
        return e.map((e)=>e.course)
    })
}