import { checkToken } from "../../../methods/Tokens.js"
import isLength from 'validator/lib/isLength.js'
const addUserInfo =async(parent, {
    data}, {req,prisma}, info)=>{
    const {id}=checkToken({token:req.headers.token,Roles:["TEACHER"]})
    if(data&&data.address&&!isLength(data.address,{max:"300"})){
        throw new Error("data is too big")
    }
    let educationLevel={}
    if(data.education_levels_ID){
        educationLevel={
                user:{
                    update:{
                        teacherProfile:{
                            update:{
                                educationLevel:{
                                    set:data.education_levels_ID.map((e)=>({id:e}))
                                }
                            }
                        }
                    }
                }
            }
        }
        delete data.education_levels_ID
        
    return await prisma.userInfo.upsert({
        where: { userId:id },
        update: {
            ...educationLevel,
            ...data,
        },
        create: {
            ...data,
            ...educationLevel,
            user:{
                connect:{
                    id
                }
            }
        }
    }).then(()=>true)
}
export default addUserInfo