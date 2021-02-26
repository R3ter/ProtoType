import { checkToken } from "../../methods/Tokens.js"

const getTeacherCourses=async(parent, {teacherID,take=6,skip=0}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    const materials = await prisma.materials.findMany({
        take,skip,
        where:{
        },include:{
            lookUp:true,
            description:true,
            tags:{
                select:{
                    lookUp:true,
                    id:true
                }
            },
            education_level:{
                select:{
                    id:true,
                    lookUp:true
                }
            }
        }
    },info)
    return materials.map(async (e)=>{
        console.log(e)
        return {
            ...e,
        }
    })

}

export default getTeacherCourses