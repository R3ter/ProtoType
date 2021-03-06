import { checkToken } from "../../methods/Tokens.js"

const getTeacherCourses=async(parent, {teacherID,take=6,skip=0}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    return await prisma.materials.findMany({
        take,skip,
        where:{
            teachers:{
                some:{
                    id:teacherID
                }
            }
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

}

export default getTeacherCourses