import { checkToken } from "../../methods/Tokens.js"

const getTeacher=async(parent, {teacherID}, {req,prisma}, info)=>{
    // const {id} = checkToken({token:req.headers.token})
    return await prisma.teacherProfile.findUnique({
        where:{
            teacherId:teacherID
        },
        include:{
            user:true,
            description:true,
            subjects:true,
            reviews :true,
            Courses :true
        }
    })
}

export default getTeacher