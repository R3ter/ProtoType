import validator from 'validator'
import bcrypt from 'bcrypt'
import {loginToken} from './../../methods/Tokens.js'

const login =async (parent,{username,password},{prisma})=>{
    let user;
    throw new Error("dawdawdsawe")
    if(validator.isEmail(username)){
        user = await prisma.user.findUnique({
            where:{
                email:username.toLowerCase()
            }
        }).then(async(e)=>{
            if(!e){
                throw new Error("password does not match")
            }
            const {id,first_name,Role,last_name,email,phone_number,Active,password:userPassword}=e
            if(bcrypt.compareSync(password, userPassword)){
                const info=await loginToken(id,Role,Active,email)
                return {...info,isActive:Active,first_name,last_name,email,phone_number}
            }
        })
    }else if(validator.isMobilePhone(username,null,{strictMode:true})){
        user = await prisma.user.findUnique({
            where:{
                phone_number:username
            }
        }).then(async(e)=>{
            if(!e){
                throw new Error("password does not match")
            }
            const {id,first_name,Role,last_name,email,phone_number,Active,password:userPassword}=e
            if(bcrypt.compareSync(password, userPassword)){
                const info=await loginToken(id,Role,Active,email)
                return {...info,isActive:Active,first_name,last_name,email,phone_number}
            }
        })
    }
    if(user){
        return user
    }
    throw new Error("password does not match")
}

export default login