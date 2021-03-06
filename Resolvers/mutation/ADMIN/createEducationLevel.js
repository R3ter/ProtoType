import {checkToken} from './../../../methods/Tokens.js'

const createEducationlevel=async (parent,{
    data:{
        price:{
            oneHour,
            OneAndHalf,
            TwoAndHalfHours,
            TwoHours,
            ThreeHours
        },
        name,
        schoolTypeId
    }
},{prisma,req})=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.education_Level.create({
        data:{
            oneHour,
            OneAndHalf,
            TwoHours,
            ThreeHours,
            TwoAndHalfHours,
            lookUp:{
                create:{
                    ...name
                }
            },
            type:{
                connect:{
                    id:schoolTypeId
                }
            }
        }
    }).then((e)=>true)
}

export default createEducationlevel