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
            Role:"TEACHER",
            // teacherProfile:{
            //     teacherIsActive:true
            // }
        },
        include:{
            userInfo:true,
            teacherProfile:true   
        }
    }).then(async(userInfo)=>{
        return {
            centerLongitude:longitude,
            centerLatitude:latitude,
            teachers:
            await userInfo.map(async(e)=>{
                return {
                    ...e.teacherProfile,
                    ...e.userInfo,
                    ...e,
                    
                    ...await prisma.teacherReview.aggregate({
                        where:{
                            teacherProfileId:e.userId
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
    }
})
}
export default getTeachersOnMap