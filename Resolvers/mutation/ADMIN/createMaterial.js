import { checkToken } from "./../../../methods/Tokens.js"

const createMaterial= async (parent,{
    data:{
        education_LevelId,
        name,tags,
        description,
        image_URL,
        cover_URL,
        
    }
},{prisma,req})=>{
    checkToken({token:req.headers.token,Roles:["ADMIN"]})
    return await prisma.materials.create({
        data:{
            education_level:{
                connect:{
                  id:education_LevelId
                }
            },
            lookUp:{
                create:{
                    ...name
                }
            },
            description:{
                create:{
                    ...description
                }
            }
        }
    }).then(()=>true).catch(()=>false)
}
export default createMaterial