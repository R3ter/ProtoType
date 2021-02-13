import { checkToken } from "../../methods/Tokens.js"
const getTeacherReviews=async(parent, args, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    return await prisma.appointment.findMany({
        where:{
          userId:id
        },
        include:{
            teacher:true,
            course:{
                select:{
                    lookUp:true,
                    image_URL:true
                }
            }
        }
    })
}

export default getTeacherReviews