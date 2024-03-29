import { checkToken } from "../../../methods/Tokens.js"
import moment from 'moment'
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
                    from:moment.utc(e.from).format("HH:mm a"),
                    to:moment.utc(e.to).format("HH:mm a")
                }))
            }
        })
    })
}
export default getMyWorkingHours