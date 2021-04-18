import { checkToken } from "../../../methods/Tokens.js"

export default async (parent,{skip=0,take=10},{prisma,req})=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.user.findMany({
        where:{
            Role:"STUDENT"
        },
        include:{
            userInfo:{
                select:{
                    Current_education_level:{
                        select:{
                            lookUp:true,
                            id:true,
                            type:{
                                select:{
                                    id:true,
                                    name:true
                                }
                            }
                        }
                    }
                }
            }
        },
        skip,take
    }).then((e)=>{
        return e.map((e)=>{
            return {
                id:e.id,
                email:e.email,
                image_URL:e.image_URL,
                full_name:e.full_name,
                education_level:e.userInfo?e.userInfo.Current_education_level:null,
            }
        })
    })
}