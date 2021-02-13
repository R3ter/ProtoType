const getClassStudents= async(parent, {courseID}, {req,prisma}, info)=>{
    return await prisma.user.findMany({
        where:{
            OR:[
                await prisma.materials.findUnique({
                    where:{
                        id:courseID
                    }
                }).then((f)=>(
                    f.map((e)=>(
                        {id:e.studentsID}
                    ))
                )).catch(()=>undefined)
            ]
        },
        include:{
            userInfo:true
        }
    })
}
export default getClassStudents