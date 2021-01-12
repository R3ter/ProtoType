import { checkToken } from "../../methods/Tokens.js"
import isLength from 'validator/lib/isLength.js'
const addUserInfo =async(parent, {data}, {req,prisma}, info)=>{

    const {id}=checkToken(req.headers.token)

    if(!isLength(data.address,{max:"100"})){
        throw new Error("data is too big")
    }
    
    const userInfo= await prisma.userInfo.upsert({
        where: { userId:id },
        update: {
            ...data,
            City:{
                connect:{
                    id:data.City
                }
            },
            preferred_materials:{
                connect:data.preferred_materials.map((e)=>{return{id:e}})
            },
            Area:{
                connect:{
                    id:data.Area
                }
            }
        },
        create: {
            user:{
                connect:{
                    id
                }
            },
            ...data,
            preferred_materials:{
                connect:data.preferred_materials.map((e)=>{return{id:e}})
            },
            City:{
                connect:{
                    id:data.City
                }
            },
            Area:{
                connect:{
                    id:data.Area
                }
            }
        }
    })
    return !!userInfo
}
export default addUserInfo