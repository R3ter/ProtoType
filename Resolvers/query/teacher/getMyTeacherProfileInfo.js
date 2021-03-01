import { checkToken } from "../../../methods/Tokens.js"

const getTeacher=async(parent, args, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    return await prisma.user.findUnique({
        where:{
            id
        },
        include:{
            userInfo:true,
            teacherProfile:{
                select:{
                    educationLevel:{
                        select:{
                            id:true,
                            lookUp:true,
                            type:{
                                select:{
                                    name:true,
                                    id:true
                                }
                            },
                        }
                    }
                }
            }
        }
    }).then(async(e)=>{
        console.log(e.teacherProfile.educationLevel.type)
        return {
            full_name:e.full_name,
            email:e.email,
            image_URL:e.userInfo.image_URL,
            phone_number:e.phone_number,
            birth_date:e.userInfo.birth_date,
            about:e.userInfo.about,
            Education_Level:e.teacherProfile.educationLevel,
            address:e.userInfo.address,
            longitude:e.userInfo.longitude,
            latitude:e.userInfo.latitude,
            schoolType:e.teacherProfile.educationLevel.map((e)=>e.type)
        }
    })
    
}

export default getTeacher