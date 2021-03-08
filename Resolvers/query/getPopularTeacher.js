import { checkToken } from "../../methods/Tokens.js"

const getBestTeachers= async(parent, {skip=0,take=5}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})

    const teachers = await prisma.teacherProfile.findMany({
        skip,take,
        // where:{
        //     OR:tags.map((e)=>({subjects:{some:{id:e}}}))
        //   },
        where:{
            teacherIsActive:true
        },
        include:{
            user:{
                select:{
                    id:true,
                    full_name:true,
                    phone_number:true,
                    email:true,
                    userInfo:true
                    
                }
            }
        }
    })
    return teachers.map(async (e)=>{
        return {
            ...e
        }
    })
}
export default getBestTeachers