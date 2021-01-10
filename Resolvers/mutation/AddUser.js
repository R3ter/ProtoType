import isEmail from 'validator/lib/isEmail.js';
import isLength from 'validator/lib/isLength.js'
const addUser=async (parent, {data:{
  username,
  password,
  email,
  first_name,
  last_name,
  phone_number
}
}, {req,prisma}, info)=>{
  if(!isLength(email,{max:50})||
  !isLength(last_name,{max:50})||
  !isLength(phone_number,{max:50})||
  !isLength(first_name,{max:50})){
    return {result:false,error:"one of the fields is too long"}
  }
  if(username.match("@")){
    return {result:false,error:"username can not contains @"}
  }
  if(!isLength(username,{min:6,max:20})){
    return {result:false,error:"username must be at least 6 to 20 characters in length"}
  }
  if(!isEmail(email)){
    return {result:false,error:"email is not correct"}
  }
  if(!isLength(password,{min:6,max:30})){
    return {result:false,error:"password must be at least 6 to 30 characters in length"}
  }
  if(!password.match(/[a-z]/)||!password.match(/[0-9]/)){
    return {result:false,error:"password should contains numbers and letters"}
  }
  return await prisma.user.create({
     data:{
       username,
       first_name,
       last_name,
       email,
       phone_number,
       password
     }
   }).then((result)=>{
      if(result){
        return {result:true}
      }
   })
}
export default addUser