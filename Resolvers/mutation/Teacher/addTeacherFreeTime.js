import {checkToken} from './../../../methods/Tokens.js'

const addMyFreeTime=async(parent, {day,hours}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    return await prisma.teacherProfile.update({
        where:{
            teacherId:id
        },
        data:{
            workingDays:{
            create:{
              day,
              hours:{
                  set:hours
                }
            }
          }
        }
      }).then((e)=>{
        return !!e
    }).catch((e)=>false)
}

export default addMyFreeTime 