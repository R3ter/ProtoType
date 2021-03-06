import { checkToken } from "../../../methods/Tokens.js"

const getTeachers=async (parent,{take=5,skip=0,active=false},{prisma,req})=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.user.findMany({
        skip,take,
        where:{
            Role:"TEACHER",
            teacherProfile:{
                teacherIsActive:active
            }
        },
        include:{
            teacherProfile:true
        }
    }).then((e)=>{
        return e.map((e)=>{
            return{
                id:e.id,
                IDFrontImageURL:e.teacherProfile.IDFrontImageURL,
                IDBackImageURL:e.teacherProfile.IDBackImageURL,
                certificateURL:e.teacherProfile.certificateURL,
                CV_URL:e.teacherProfile.CV_URL,
                image_URL:e.image_URL,
                name:e.full_name,
                createdAt:e.createdAt,
                updatedAt:e.updatedAt
            }
        })
    })
}

export default getTeachers