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
            upsert:{
                update:{
                    educationLevel:{
                        set:data.education_levels_ID.map((e)=>({id:e}))
                    }
                },create:{
                    educationLevel:{
                        connect:data.education_levels_ID.map((e)=>({id:e}))
                    }
                }
            }
        }
    }
    delete data.education_levels_ID
        
    return await prisma.user.update({
        where: { id },
        data: {
            teacherProfile:{
                ...educationLevel
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