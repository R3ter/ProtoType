import { checkToken } from "../../../methods/Tokens.js"


const getTeachers=async (parent,{take=10,skip=0},{prisma,req})=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.user.findMany({
        skip,take,
        where:{
            Role:"TEACHER"
        },
        include:{
            teacherProfile:{
                select:{
                    major:true,
                    teacherIsActive:true,
                    IDFrontImageURL:true,
                    IDBackImageURL:true,
                    certificateURL:true,
                    CV_URL:true,
                    educationLevel:{
                        select:{
                            lookUp:true,
                            id:true,
                            type:{
                                select:{
                                    id:true,  
                                    name:true
                                }
                            }
                        }
                    }
                }
            },
            userInfo:true
        }
    }).then((e)=>{
        return e.map((e)=>{
            console.log(e)
            return{
                major:e.major,
                phone_number:e.phone_number,
                email:e.email,
                id:e.id,
                educationLevel:e.teacherProfile.educationLevel,
                IDFrontImageURL:e.teacherProfile.IDFrontImageURL,
                IDBackImageURL:e.teacherProfile.IDBackImageURL,
                certificateURL:e.teacherProfile.certificateURL,
                CV_URL:e.teacherProfile.CV_URL,
                image_URL:e.image_URL,
                name:e.full_name,
                createdAt:e.createdAt,
                state:e.Active,
                updatedAt:e.updatedAt,
                userInfo:{
                    ...e.userInfo
                }
            }
        })
    })
}

export default getTeachers