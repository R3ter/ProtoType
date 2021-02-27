import { checkToken } from "../../../methods/Tokens.js"

const becomeaTeacher= async(parent, {message}, {req,prisma}, info)=>{
    const {id}=checkToken({token:req.headers.token})
    return await prisma.teacherProfile.create({
        data:{
            user:{
                connect:{
                    id
                }
            }
        }
    }).then(async ()=>await prisma.user.update({
        where:{
            id
        },
        data:{
            Role:"TEACHER"
        }
    }).then(()=>true))
    .catch((e)=>{
        return false})

    // /////////test mode
    // return await prisma.TeacherApplication.create({
    //     User:{
    //         connect:{
    //             id
    //         }
    //     },
    //     message
    // }).then((e)=>true)
    // .catch(()=>false)
}
export default becomeaTeacher
