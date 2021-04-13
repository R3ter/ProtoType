import { checkToken } from "../../../methods/Tokens.js"


export default async(parent, {teacherId}, {req,prisma}, info)=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})

    return await prisma.teacherProfile.findUnique({
        where:{
            teacherId
        },
        include:{
            major:{
                select:{
                    id:true,
                    name:true
                }
            },
            materials:{
                select:{
                    lookUp:true,
                    id:true
                }
            },
            educationLevel:{
                select:{
                    id:true,
                    lookUp:true,
                    type:{
                        select:{
                            name:true,
                            id:true
                        }
                    }
                }
            },
            user:{
                select:{
                    id:true,
                    full_name:true,
                    phone_number:true,
                    email:true,
                    userInfo:true,
                    Materials:{
                        select:{
                            lookUp:true,
                            id:true
                        }
                    },
                }
            }
        }
    }).then((e)=>{
        return {
            ...e,
            materials:e.user.Materials
        }
    })
}
