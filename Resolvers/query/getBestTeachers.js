import { checkToken } from "../../methods/Tokens.js"

const getBestTeachers= async(parent, {data}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    return await prisma.teacherProfile.findMany({
        include:{
            user:true,
            description:true,
            subjects:true,
            reviews :true,
            Courses :true
        }
    })
}
export default getBestTeachers