import { checkToken } from "../../../methods/Tokens.js"

const getMaterialsForAdmin=(parent,{teacherId},{prisma,req},info)=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    let filter={}
    if(teacherId){
        filter={
            teachers:{
                some:{
                    id:teacherId
                }
            }
        }
    }
    return prisma.materials.findMany({
        where:{
            ...filter
        },
        include:{
            lookUp:true,
            TeacherProfile:true,
            UserInfo:true,
            Appointment:true,
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
    })
}
export default getMaterialsForAdmin