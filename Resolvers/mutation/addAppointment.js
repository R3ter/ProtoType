import {checkToken} from './../../methods/Tokens.js'
const appAppointment=async(parent,
    {
        data:{
            teacherId,date,from,to,note
        }
},{prisma,req},info)=>{
    const {id} = checkToken({token:req.headers.token})
    return await prisma.appointment.create({
        data:{
            date,from,to,note,
            teacher:{
                connect:{
                    id:teacherId
                }
            },
            user:{
                connect:{
                    id
                }
            }
        }
    }).then(()=>true)
    .catch((e)=>false)
}
export default appAppointment