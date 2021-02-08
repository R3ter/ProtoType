const addTeacherReview=async(parnet,args,{prisma,req},info)=>{
    const {id} = checkToken({token:req.headers.token})
    prisma.teacherReview.create({
        data:{
            user:{
                connect:{
                    id
                }
            },
            TeacherProfile:{
                connect:{
                    teacherProfileId
                }
            }
        }
    })
}
export default addTeacherReview