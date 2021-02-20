import {checkToken} from './../../../methods/Tokens.js'
const connectToMaterial=async (parent,{materialID},{prisma,req})=>{
    const {id}=checkToken({Roles:["TEACHER"],token:req.headers.token})

    return await prisma.materials.update({
        where:{
            id:materialID
        },
        data:{
            teachers:{
                connect:{
                  id
                }
            }
        }
    }).then((e)=>!!e)
    .catch(()=>false)
}

export default connectToMaterial