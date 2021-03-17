import { checkToken } from "../../methods/Tokens.js"
import isLength from 'validator/lib/isLength.js'
const addUserInfo =async(parent, {
    data}, {req,prisma}, info)=>{
    const {id}=checkToken({token:req.headers.token})
    if(data&&data.address&&!isLength(data.address,{max:"1000"})){
        throw new Error("data is too big")
    }
    if(data&&data.preferred_materials){
        if((new Set(data.preferred_materials)).size !== data.preferred_materials.length){
            throw new Error ("duplicate material data")
        }
    }
    if(data.Current_education_level_ID){
            data.Current_education_level={
                connect:{
                    id:data.Current_education_level_ID
                }
            }
        }else{
            delete data.Current_education_level_ID
        }
        delete data.Current_education_level_ID
    const userInfo = await prisma.userInfo.upsert({
        where: { userId:id },
        update: {
            ...data,
            user:{
                update:{
                    full_name:data.full_name
                }            },
            full_name:undefined,

            preferred_materials:data.preferred_materials?{
                set:data.preferred_materials.map((e)=>{return{id:e}})
            }:undefined
        },
        create: {
            ...data,
            user:{
                update:{
                    full_name:data.full_name
                }
                
            },
            full_name:undefined,
            user:{
                connect:{
                    id
                }
            },
            
            preferred_materials:data.preferred_materials?{
                connect:data.preferred_materials.map((e)=>{return{id:e}})
            }:undefined
        }
    })
    return !!userInfo
}
export default addUserInfo