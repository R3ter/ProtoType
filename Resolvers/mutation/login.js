import validator from 'validator'
import bcrypt from 'bcrypt'
import {loginToken} from './../../methods/Tokens.js'

const login = async(parent,{username,password},{prisma})=>{
    let user;
    if(validator.isEmail(username)){
        user = await prisma.user.findUnique({
            where:{
                email:username.toLowerCase()
            },
            include:{
                userInfo:true
            }
        }).then(async(e)=>{
            if(!e){
                return{error:"password does not match",result:false}
            }
            const {userInfo,id,full_name,Role,email,phone_number,Active,password:userPassword}=e
            if(bcrypt.compareSync(password, userPassword)){
                const info=await loginToken(id,Role,Active,email,phone_number)
                console.log(!!userInfo)
                return {result:true,
                    authentication:{
                        ...info,
                        isActive:Active,
                        isInfoComplet:!!userInfo,
                        materialSet:!!userInfo?(!!userInfo.preferred_materials?!!userInfo.preferred_materials.length:false):false,
                        full_name,
                        email,
                        phone_number
                    }}
                }
        })
    }else if(validator.isMobilePhone(username,null,{strictMode:true})){
        user = await prisma.user.findUnique({
            where:{
                phone_number:username
            },        
            include:{
                userInfo:true
            }
        }).then(async(e)=>{
            if(!e){
                return{error:"password does not match",result:false}
            }
            const {userInfo,id,full_name,Role,email,phone_number,Active,password:userPassword}=e
            if(bcrypt.compareSync(password, userPassword)){
                const info=await loginToken(id,Role,Active,email,phone_number)
                return {result:true,
                    authentication:{
                        ...info,
                        isActive:Active,
                        isInfoComplet:!!userInfo,
                        materialSet:!!userInfo?(!!userInfo.preferred_materials?!!userInfo.preferred_materials.length:false):false,
                        full_name,
                        email,
                        phone_number
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