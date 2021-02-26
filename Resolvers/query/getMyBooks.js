import { checkToken } from "../../methods/Tokens.js"
const getTeacherReviews=async(parent, {take=5,skip=0,stateKey}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    return await prisma.appointment.findMany({
        take,skip,
        where:{
          studentId:id,
          state:{
            Appoitment_state_key:stateKey
          }
        },
        orderBy:{
            createdAt:"desc"
        },
        include:{
            teacher:{
                select:{
                    id:true,
                    full_name:true,
                    teacherProfile:true
                }
            },
            course:{
                select:{
                    id:true,
                    lookUp:true,
                    description:true,
                    education_level:{
                        select:{
                            lookUp:true,
                            id:true
                        }
                    }
                }
            },
            state:{
                select:{
                    name:true,
                    color:true,
                    id:true
                }
            }
        }
    }).then((e)=>{
        return e.map((e)=>{
            return {
                ...e,
                time:{
                    from:e.from,
                    to:e.to
                }
            }
        })
    })
}

export default getTeacherReviews