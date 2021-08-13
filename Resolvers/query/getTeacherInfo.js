import { checkToken } from "../../methods/Tokens.js"

const getTeacher=async(parent, {teacherID}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    return await prisma.user.findUnique({
        where:{
            id:teacherID
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
        const schoolTypeIDs=[]
        const schoolType=[]
        e.teacherProfile.educationLevel.map((e)=>{
            if(!schoolTypeIDs.includes(e.type.id)){
                schoolTypeIDs.push(e.type.id)
                schoolType.push(e.type)
            }
        })
        return {
            ...e,
            user:{...e},
            full_name:e.full_name,
            email:e.email,
            image_URL:e.userInfo?e.userInfo.image_URL:null,
            phone_number:e.phone_number,
            birth_date:e.userInfo?e.userInfo.birth_date:null,
            about:e.userInfo?e.userInfo.about:null,
            Education_Level:e.teacherProfile.educationLevel,
            address:e.userInfo?e.userInfo.address:null,
            longitude:e.userInfo?e.userInfo.longitude:null,
            latitude:e.userInfo?e.userInfo.latitude:null,
            schoolType,
            educationLevel:e.teacherProfile.educationLevel
        }
    })
    
}

export default getTeacher