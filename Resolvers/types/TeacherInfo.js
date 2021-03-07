import { checkToken } from "../../methods/Tokens.js"

const getTeacherInfo={
    async canContact(parent,args,{prisma,req}){
        const {id} = checkToken({token:req.headers.token})
        return await prisma.appointment.count({
            where:{
                teacherId:parent.user.id,
                studentId:id
            }
        }).then((e)=>e>0)

    }
}
export default getTeacherInfo
