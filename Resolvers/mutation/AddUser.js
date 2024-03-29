import validator from 'validator';
import bcrypt from 'bcrypt'
import { sendActivateCode } from '../../methods/activate.js';
import { loginToken } from '../../methods/Tokens.js';
import { storeNotification } from '../../methods/addNotification.js';
console.log(bcrypt.hashSync("0592373906",6))
const addUser=async (parent, {data:{
  accountType,
  // username,
  password,
  email,
  full_name,
  phone_number,
  deviceToken
}
}, {req,prisma}, info)=>{

  if(!validator.isLength(full_name,{min:3,max:50})){
    return {result:false,error:"feild 'name' must be between 3 and 20 character long"}
  }
  // if(!validator.isMobilePhone(phone_number,null,{strictMode:true})){
  //   return {result:false,error:"phone number is invalid"}
  // }
  
  if(!validator.isEmail(email)){
    return {result:false,error:"email is invalid"}
  }
  if(!validator.isLength(password,{min:6,max:30})){
    return {result:false,error:"password must be at least 6 to 30 characters long"}
  }
  // if(!password.match(/[a-z]/)||!password.match(/[0-9]/)){
  //   return {result:false,error:"password should contains numbers and letters"}
  // }
  let TeacherInfo={}
  if(accountType=="TEACHER"){
    TeacherInfo={
      teacherProfile:{
        create:{

        }
      }
    }
  }

  const hash = bcrypt.hashSync(password, 6);
  return await prisma.user.create({
    data:{
      //  username,
      ...TeacherInfo,
      full_name,
      email:email.toLowerCase(),
      phone_number,
      Role:accountType,
      password:hash
    }
  }).then(async(result,e)=>{
    if(result){
        sendActivateCode(email)
        const token=await loginToken({userid:result.id,role:result.Role,Activate:false,
          email,phone_number:result.phone_number,
          deviceToken,
          teacherIsActive:accountType=="TEACHER"?false:undefined,full_name})

          if(accountType=="TEACHER"){
            const adminsIds = await prisma.user.findMany({
              where:{
                  Role:"ADMIN"
              }
            }).then((e)=>{return e.map((e)=>e.id)})
            storeNotification({
              elementId:result.id,
              title:`a new teacher has registered!`,
              body:"check his request",
              to_full_name:"admins",
              from_full_name:result.full_name,
              fromId:result.id,
              toId:adminsIds,
              fromImage:"",
              type:"signup"
            })
          
          }

        return {result:true,
          authentication:{
            teacherDocumentUploaded:result.Role=="TEACHER"?false:undefined,
            teacherIsActive:result.Role=="TEACHER"?false:undefined,
            ...token,
            isActive:false,
            isInfoComplet:false,
            materialSet:false,
            full_name,
            email:email.toLowerCase()
            ,phone_number
        }}
      }
    }).catch((e)=>{
      if(e.code=="P2002"){
        return {result:false,error:e.meta.target[0]+" already exists"}
      }
      return {result:false,error:e}
    })
}
export default addUser