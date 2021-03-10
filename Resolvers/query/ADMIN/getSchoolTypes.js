import { checkToken } from "../../../methods/Tokens.js"
const getSchools=async(parent,args,{prisma,req})=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.schoolType.findMany({
        include:{
            Education_Level:{
                select:{
                    oneHour:true,
                    OneAndHalf:true,
                    TwoHours:true,
                    TwoAndHalfHours:true,
                    ThreeHours:true,
                    select:{
                        lookUp:true,
                        id:true
                    }
                }
            },
            name:true
        }
    })
}

export default getSchools