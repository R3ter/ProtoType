import { checkToken } from "../../../methods/Tokens.js"
import validator from 'validator';

const TeacherAddMaterial= async(parent, 
    {data:{
        name,
        description,
        education_level,
        image_URL,
        courseTags,
    }}
    , {req,prisma}, info)=>{ 
        const {id} = checkToken({Roles:"TEACHER",token:req.headers.token})
        // if(!validator.isLength(name.ar,{min:3,max:20})){
        //     return {result:false,error:"arabic name should be between 3 and 20 character long"}
        // }
        // if(!validator.isLength(name.eng,{min:3,max:20})){
        //     return {result:false,error:"english name should be between 3 and 20 character long"}
        // }
        // if(name.fr&&!validator.isLength(name.eng,{min:3,max:20})){
        //     return {result:false,error:"french name should be between 3 and 20 character long"}
        // }
        // if(!validator.isLength(description.ar,{min:3,max:20})){
        //     return {result:false,error:"arabic description should be between 3 and 20 character long"}
        // }
        // if(!validator.isLength(description.eng,{min:3,max:20})){
        //     return {result:false,error:"english description should be between 3 and 20 character long"}
        // }
        // if(description.fr&&!validator.isLength(description.eng,{min:3,max:20})){
        //     return {result:false,error:"french description should be between 3 and 20 character long"}
        // }
        // return await prisma.materials.create({
        //     data:{
        //       lookUp:{
        //           create:{
        //               ...name
        //           }
        //       },
        //       description:{
        //           create:{
        //               ...description
        //           }
        //       },
        //       education_level:{
        //         connect:{
        //           education_level
        //         }
        //       },
        //       tags:{
        //         connect:courseTags.map((e)=>({id:e}))
        //       },
        //       image_URL,
        //       TeacherProfile:{
        //         connect:{
        //             teacherId:id
        //         }
        //       },
        //       teacher:{
        //         connect:{
        //             id:id
        //         }
        //       }
        //     }
        //   }).then((e)=>({result:true}))
        // .catch((e)=>({result:true,error:e}))
}

export default TeacherAddMaterial