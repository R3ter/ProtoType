import { checkToken } from "../../../methods/Tokens.js"
import isLength from 'validator/lib/isLength.js'
const addUserInfo =async(parent, {
    data}, {req,prisma}, info)=>{
    const {id}=checkToken({token:req.headers.token,Roles:["TEACHER"]})
    if(data&&data.address&&!isLength(data.address,{max:"1000"})){
        throw new Error("data is too big")
    }
    let educationLevel={}
    if(data.education_levels_ID){
        educationLevel={
            educationLevel:{
                set:data.education_levels_ID.map((e)=>({id:e}))
            }
        }
    }
    delete data.education_levels_ID
    let major
    if(data.majorId){
        major={
            major:{
                connect:{
                    where:{
                        id:data.majorId
                    }
                }
            }
        }
    }
    delete data.majorId
        
    return await prisma.user.update({
        where: { id },
        data: {
            teacherProfile:{
                update:{
                    ...major,
                    ...educationLevel
                }
            },
            userInfo:{
                upsert:{
                    create:{
                        ...data
                    },
                    update:{
                        ...data
                    }
                }
            }
        }
    }).then(()=>true)
}
export default addUserInfo