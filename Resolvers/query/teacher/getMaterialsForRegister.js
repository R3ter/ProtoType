import {checkToken} from './../../../methods/Tokens.js'
const getMyEducationLevels=async( parent,{educationLevelId},{prisma,req})=>{
    const {id} = checkToken({Roles:"TEACHER",token:req.headers.token})
    console.log(id)
    return await prisma.materials.findMany({
        where:{
            AND:{
                education_level:{
                  id:educationLevelId
                },
                NOT:{
                  teachers:{
                    some:{
                      id
                    }
                  }
                }
              }
        },include:{
            lookUp:true,
            description:true,
        }
      })
}
export default getMyEducationLevels