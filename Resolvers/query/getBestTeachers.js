import { checkToken } from "../../methods/Tokens.js"

const getBestTeachers= async(parent, {take=5,skip=0}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})

    const teachers= await prisma.teacherProfile.findMany({
        take,skip,

        include:{
            user:true
        }
    })
    return teachers.map(async (e)=>{
        return {
            ...e,
            id:e.teacherId,
        }
    })
}
export default getBestTeachers