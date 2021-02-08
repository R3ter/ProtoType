import { checkToken } from "../../methods/Tokens.js"

const getTeachersOnMap=async(parent,args,{prisma,req},info)=>{
    const {id} = checkToken({token:req.headers.token})
    const {longitude,latitude}=await prisma.userInfo.findUnique({
        where:{
            userId:id
        }
    })
    return await prisma.user.findMany({
        where:{
            Role:"TEACHER"
        },
        include:{
            userInfo:true,
            teacherProfile:true
        }
    }).then(async(userInfo)=>{
        console.log(userInfo)
        return await userInfo.map(async(e)=>{
            return {
                userLongitude:longitude,
                userLatitude:latitude,
                ...e.userInfo,
                ...e,
                ...await prisma.teacherReview.aggregate({
                    where:{
                        TeacherProfile:{
                            teacherId:e.userId
                        }
                        },
                    avg:{
                        ratingStars:true
                    },
                    count:true
                }).then((e)=>{
                    return {
                        ratingStars:e.avg.ratingStars,
                        count:e.count
                    }
                })
            }
        })
    })
}
export default getTeachersOnMap