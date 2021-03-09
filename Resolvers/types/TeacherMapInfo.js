import { checkToken } from "../../methods/Tokens.js"

const getTeachersOnMap={
    async canContact(parent,args,{prisma,req}){
        const {id} = checkToken({token:req.headers.token})
        console.log(parent)
        return await prisma.appointment.count({
            where:{
                teacherId:parent.teacherId,
                studentId:id,
                stateKey:"accepted"
            }
        }).then((e)=>e>0)

    }
}
export default getTeachersOnMap