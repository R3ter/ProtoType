import { checkToken } from "../../methods/Tokens.js"
import isLength from 'validator/lib/isLength.js'
const addUserInfo =async(parent, {
    skipedInfo=false,
    skipedMaterials=false,
    data}, {req,prisma}, info)=>{
    const {id}=checkToken({token:req.headers.token})

    if(data&&data.address&&!isLength(data.address,{max:"100"})){
        throw new Error("data is too big")
    }
    if(data&&data.preferred_materials){
        if((new Set(data.preferred_materials)).size !== data.preferred_materials.length){
            throw new Error ("duplicate material data")
        }
    }
    if(!data||skipedInfo||skipedMaterials){
        return await prisma.user.update({
            where:{
                id
            },
            data:{
                skipedInfo:skipedInfo,
                skipedMaterials:skipedMaterials
                }
        }).then((e)=>{
            if(e)
                return true
        }).catch((e)=>false)
    }
        if(data.City){
            data.City={ connect:{
                id:data.City
            }}
        }else{
            delete data.City
        }
        if(data.Area){
            data.Area={
                connect:{
                    id:data.Area
                }
            }
        }else{
            delete data.Area
        }
        if(data.Current_education_level){
            data.Current_education_level={
                connect:{
                    education_level:data.Current_education_level
                }
            }
        }else{
            delete data.Current_education_level
        }
        if(data.preferred_materials){
            data.preferred_materials={
                connect:data.preferred_materials.map((e)=>{return{id:e}})
            }
        }else{
            delete data.preferred_materials
        }
    const userInfo= await prisma.userInfo.upsert({
        where: { userId:id },
        update: {
            skipedInfo,
            skipedMaterials,
            ...data,
            
        },
        create: {
            skipedInfo,
            skipedMaterials,
            user:{
                connect:{
                    id
                }
            },
            ...data,
        }
    })
    return !!userInfo
}
export default addUserInfo