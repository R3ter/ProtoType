
import { checkToken } from '../../methods/Tokens.js'
const addfirebaseToken=async(parent,{materialId},{prisma,req})=>{
    const {id}=checkToken({token:req.headers.token,Roles:"STUDENT"})

    const favorite = await prisma.userInfo.findUnique({
        where:{
            userId:id
        },
        include:{
            favoriteCourses:true
        }
    }).then((e)=>e.favoriteCourses.map((e)=>e.id))

    if(favorite.includes(materialId)){        
        return await prisma.userInfo.update({
            where:{
                userId:id
            },
            data:{
                favoriteCourses:{
                    disconnect:{
                        id:materialId
                    }
                }
            }
        }).then(()=>true)
        .catch(()=>false)
    
    }
    return await prisma.userInfo.update({
        where:{
            userId:id
        },
        data:{
            favoriteCourses:{
                connect:{
                    id:materialId
                }
            }
        }
    }).then(()=>true)
    .catch(()=>false)
}

export default addfirebaseToken