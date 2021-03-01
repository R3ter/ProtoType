const search=async (parent ,{word},{prisma})=>{
    return await prisma.user.findMany({
        where:{
            Role:"TEACHER",
            full_name:{
                contains:word
            }
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
        return e.map((e)=>{
            console.log(e)
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
    })
}

export default search