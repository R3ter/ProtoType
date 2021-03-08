const getMaterialTeachers=async(parent,{materialID,skip=0,take=5},{prisma,req})=>{
    return await prisma.materials.findUnique({
        where:{
            id:materialID
        },include:{
            teachers:{
                where:{
                    teacherProfile:{
                        teacherIsActive:true
                    }
                },
                skip,take,
                select:{
                    full_name:true,
                    id:true,
                    teacherProfile:true,
                    userInfo:{
                        select:{
                            about:true,
                            longitude:true,
                            latitude:true,
                            image_URL:true,
                            cover_URL:true,
                            about:true
                        }
                    }
                }
            }
        }
    }).then(e=>{
        return e.teachers
    })


}
export default getMaterialTeachers