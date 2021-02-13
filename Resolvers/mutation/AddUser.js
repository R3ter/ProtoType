import validator from 'validator';
import bcrypt from 'bcrypt'
import { sendActivateCode } from '../../methods/activate.js';
import { loginToken } from '../../methods/Tokens.js';

const addUser=async (parent, {data:{
  // username,
  password,
  email,
  full_name,
  phone_number
}
}, {req,prisma}, info)=>{

  if(!validator.isLength(full_name,{min:3,max:50})){
    return {result:false,error:"feild 'first name' must be between 3 and 20 character long"}
  }
  if(!validator.isMobilePhone(phone_number,null,{strictMode:true})){
    return {result:false,error:"phone number is invalid"}
  }
  
  if(!validator.isEmail(email)){
    return {result:false,error:"email is invalid"}
  }
  if(!validator.isLength(password,{min:6,max:30})){
    return {result:false,error:"password must be at least 6 to 30 characters long"}
  }
  // if(!password.match(/[a-z]/)||!password.match(/[0-9]/)){
  //   return {result:false,error:"password should contains numbers and letters"}
  // }

  const hash = bcrypt.hashSync(password, 6);
  return await prisma.user.create({
    data:{
      //  username,
      full_name,
      email:email.toLowerCase(),
      phone_number,
      password:hash
    }
  }).then(async(result,e)=>{
    if(result){
        sendActivateCode(email)
        const token=await loginToken(result.id,result.Role,false,email,result.phone_number)
        return {result:true,
          authentication:{
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