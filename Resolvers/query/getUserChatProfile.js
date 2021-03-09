const getUserChatProfile=async(parent,{userId},{prisma,req},info)=>{
    return await prisma.userInfo.findUnique({
        where:{
            userId
        },
        include:{
            user:true
        }
    }).then((e)=>{
        if(e)
        return{
            profileImage:e.image_URL,
            userName:e.user.full_name
        }
    })

}
export default getUserChatProfile