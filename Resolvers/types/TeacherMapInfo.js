const getTeachersOnMap={
    async canContact(parent,args,{prisma,req}){
        const {id} = checkToken({token:req.headers.token})
        return await prisma.appointment.count({
            where:{
                teacherId:parent.user.id,
                studentId:id,
                stateKey:"accepted"
            }
        }).then((e)=>e>0)

    }
}
export default getTeachersOnMap