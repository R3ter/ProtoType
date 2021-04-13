import { checkToken } from "../../../methods/Tokens.js"

export default async(parent,{studentId},{req,prisma},info)=>{
    checkToken({token:req.headers.token,Roles:"ADMIN"})
    return await prisma.user.findUnique({
        where:{
            id:studentId
        },
        include:{
            userInfo:{
                select:{
                    image_URL:true,
                    Current_education_level:{
                        select:{
                            id:true,
                            lookUp:true,
                            type:{
                                select:{
                                    name:true,
                                    id:true
                                }
                            }
                        }
                    },
                    longitude:true,
                    latitude:true,
                    address:true
                }
            },
            studentReview:true
        }
    })
}