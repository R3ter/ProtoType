import { checkToken } from "../../../methods/Tokens.js"

const deleteMaterial=async(parent,{materialID},{prisma,req})=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.materials.delete({
        where:{
            id:materialID
        }
    }).then(()=>true).catch(()=>false)
}
const deleteEducationLevel=async(parent,{education_LevelId},{prisma,req})=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.education_Level.delete({
        where:{
            id:education_LevelId
        }
    }).then(()=>true).catch(()=>false)
}

export {deleteEducationLevel,deleteMaterial}