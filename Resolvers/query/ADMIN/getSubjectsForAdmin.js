import { checkToken } from "../../../methods/Tokens.js"

const getSubjectsForAdmin=async(parent,{
    take,skip
},{prisma,req})=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.schoolType.findMany({
        include:{
            name:true,
            Education_Level:{
                select:{
                    id:true,
                    lookUp:true,
                    oneHour:true,
                    OneAndHalf:true,
                    TwoHours:true,
                    TwoAndHalfHours:true,
                    ThreeHours:true,
                    Materials:{
                        select:{
                            image_URL:true,
                            id:true,
                            description:true,
                            lookUp:true
                        }
                    }
                
                }
            }
        }
    })
}
export default getSubjectsForAdmin



