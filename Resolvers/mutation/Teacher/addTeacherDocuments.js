import { checkToken } from "../../../methods/Tokens.js"

const addTeacherInfo = async (parent,{
    data:{
        CV_uRL,
        IDFrontImageURL,
        IDBackImageURL,
        certificateURL
    }
},{prisma,req})=>{
    const {id}=checkToken({token:req.headers.token,Roles:["TEACHER"]})
    return await prisma.teacherProfile.upsert({
        where:{
            teacherId:id,
        },
        create:{
            teacherId:id,
            CV_uRL,
            IDFrontImageURL,
            IDBackImageURL,
            certificateURL
        },
        update:{
            CV_uRL,
            IDFrontImageURL,
            IDBackImageURL,
            certificateURL
        }
    }).then(()=>true)
    .catch(()=>false)
}

export default addTeacherInfo