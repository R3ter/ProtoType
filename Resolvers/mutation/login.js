import validator from 'validator'
import bcrypt from 'bcrypt'
import {loginToken} from './../../methods/Tokens.js'

const login =async (parent,{username,password},{prisma})=>{
    let user;
    if(validator.isEmail(username)){
        user = await prisma.user.findUnique({
            where:{
                email:username.toLowerCase()
            }
        }).then(async(e)=>{
            if(!e){
                return{error:"password does not match",result:false}
            }
            const {id,first_name,Role,last_name,email,phone_number,Active,password:userPassword}=e
            if(bcrypt.compareSync(password, userPassword)){
                const info=await loginToken(id,Role,Active,email,phone_number)
                return {result:true,
                    authentication:{
                        ...info,
                        isActive:Active,
                        first_name,
                        last_name,
                        email:email
                        ,phone_number
                    }}
                }
        })
    }else if(validator.isMobilePhone(username,null,{strictMode:true})){
        user = await prisma.user.findUnique({
            where:{
                phone_number:username
            }
        }).then(async(e)=>{
            if(!e){
                return{error:"password does not match",result:false}
            }
            const {id,first_name,Role,last_name,email,phone_number,Active,password:userPassword}=e
            if(bcrypt.compareSync(password, userPassword)){
                const info=await loginToken(id,Role,Active,email,phone_number)
                return {result:true,
                    authentication:{
                      ...info,
                      isActive:Active,
                      first_name,
                      last_name,
                      email:email
                      ,phone_number
                  }}
                }
            })
    }
    if(user){
        return user
    }
    return{error:"password does not match",result:false}
}

export default login