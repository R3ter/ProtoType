import {checkToken} from './../../../methods/Tokens.js'
const getMyEducationLevels=async( parent,args,{prisma,req})=>{
    const {id} = checkToken({Roles:"TEACHER",token:req.headers.token})
    return await prisma.education_Level.findMany({
        where:{
          teacherProfile:{
            some:{
              teacherId:id
            }
          }
        },
        include:{
            lookUp:true
        }
      })
}
export default getMyEducationLevels