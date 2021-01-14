import validator from 'validator';
import bcrypt from 'bcrypt'
import { sendActivateCode } from '../../methods/activate.js';
import { loginToken } from '../../methods/Tokens.js';

const addUser=async (parent, {data:{
  // username,
  password,
  email,
  first_name,
  last_name,
  phone_number
}
}, {req,prisma}, info)=>{

  if(first_name.indexOf(" ")!== -1){
    return {result:false,error:"feild 'first name' should not contain whitespace"}
  }
  if(last_name.indexOf(" ")!== -1){
    return {result:false,error:"feild 'last name' should not contain whitespace"}
  }
  if(!validator.isLength(first_name,{min:3,max:20})){
    return {result:false,error:"feild 'first name' must be between 3 and 20 character long"}
  }
  if(!validator.isLength(last_name,{min:3,max:20})){
    return {result:false,error:"feild 'last name' must be between 3 and 20 character long"}
  }
  if(!validator.isMobilePhone(phone_number,null,{strictMode:true})){
    return {result:false,error:"phone number is invalid"}
  }
  
  // if(username.match("@")){
  //   return {result:false,error:"username can not contains @"}
  // }
  // if(!isLength(username,{min:6,max:20})){
  //   return {result:false,error:"username must be at least 6 to 20 characters in length"}
  // }
  
  if(!validator.isEmail(email)){
    return {result:false,error:"email is invalid"}
  }
  if(!validator.isLength(password,{min:6,max:30})){
    return {result:false,error:"password must be at least 6 to 30 characters in length"}
  }
  if(!password.match(/[a-z]/)||!password.match(/[0-9]/)){
    return {result:false,error:"password should contains numbers and letters"}
  }

  const hash = bcrypt.hashSync(password, 6);

  return await prisma.user.create({
    data:{
      //  username,
      first_name,
      last_name,
      email:email.toLowerCase(),
      phone_number,
      password:hash
    }
  }).then(async(result)=>{
    if(result){
        sendActivateCode(email)
        const token=await loginToken(result.id,result.Role,false,email,result.phone_number)
        return {result:true,
          authentication:{
            ...token,
            isActive:false,
            first_name,
            last_name,
            email:email.toLowerCase()
            ,phone_number
        }}
      }
   })
}
export default addUser