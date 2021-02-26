import { checkToken } from "../../../methods/Tokens.js"

const getMyWorkingHours=async(parent ,args,{prisma,req})=>{
    const {id} = checkToken({Roles:"TEACHER",token:req.headers.token})
    return await prisma.workingDay.findMany({
        where:{
            teacherId:id
        }
    }).then((e)=>{
        return e.map((e)=>{
            return {
                day:e.day,
                hours:e.hours.map((e)=>({
                    from:e.split("/-/")[0],
                    to:e.split("/-/")[1]
                }))
            }
        })
    })
}
export default getMyWorkingHours