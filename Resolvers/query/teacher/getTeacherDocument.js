import { checkToken } from "../../../methods/Tokens.js"

const getDocument=async (parent,args,{prisma,req})=>{
    const {id} = checkToken({token:req.headers.token,Roles:["TEACHER"]})
    return await prisma.teacherProfile.findUnique({
        where:{
            teacherId:id
        }
    }).then((e)=>{
        return {
            IDFrontImageURL:e.IDFrontImageURL,
            IDBackImageURL:e.IDBackImageURL,
            certificateURL:e.certificateURL,
            CV_URL:e.CV_URL
        }
    })
}
export default getDocument