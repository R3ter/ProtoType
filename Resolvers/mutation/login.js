import isEmail from 'validator/lib/isEmail.js';
import isNumeric from 'validator/lib/isNumeric.js';
import {loginToken} from './../../methods/Tokens.js'

const login =async (parent,{username,password},{prisma})=>{
    let user;
    if(isEmail(username)){
        user = await prisma.user.findUnique({
            where:{
                email:username
            }
        }).then(async(e)=>{
            if(e.password===password){
                const info=await loginToken(e.id,e.Role)
                return {...info}
            }
        })
    }else if(isNumeric(username)){
        user = await prisma.user.findUnique({
            where:{
                phone_number:username
            }
        }).then(async(e)=>{
            if(e.password===password){
                const info=await loginToken(e.id,e.Role)
                return {...info}
            }
        })
    }else{
        user = await prisma.user.findUnique({
            where:{
                username:username
            }
        }).then(async(e)=>{
            if(e.password===password){
                const info=await loginToken(e.id,e.Role)
                return {...info}
            }
        })
    }
    if(user){
        return user
    }
    throw new Error("password does not match")
}

export default login