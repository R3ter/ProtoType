import validator from 'validator'
import bcrypt from 'bcrypt'
import {loginToken} from './../../methods/Tokens.js'
import { saveTokenInFirebase } from '../../methods/addNotification.js';
const login = async(parent,{username,password,deviceToken},{prisma})=>{
    let user;
    if(validator.isEmail(username)){
        user = await prisma.user.findUnique({
            where:{
                email:username.toLowerCase()
            },
            include:{
                userInfo:{
                    select:{
                        preferred_materials:true,
                        education_LevelId:true,
                        Current_education_level:{
                            select:{
                                schoolTypeId:true
                            }
                        }
                    }
                },
                teacherProfile:true
            }
        }).then(async(e)=>{
            if(!e){
                return{error:"password does not match",result:false}
            }
            if(e.banned){
                return{error:"this account has been banned!",result:false}
            }
            const {userInfo,id,full_name,Role,email,phone_number,Active,password:userPassword}=e
            if(bcrypt.compareSync(password, userPassword)){
                const info = await loginToken({userid:id,role:Role,Activate:Active,email,phone_number,
                    teacherIsActive:e.teacherProfile?e.teacherProfile.teacherIsActive:
                        e.Role=="TEACHER"?false:undefined,
                        educationLevelId:userInfo?e.userInfo.education_LevelId:undefined
                        ,SchoolTypeId:userInfo?e.userInfo.Current_education_level?
                        e.userInfo.Current_education_level.schoolTypeId:undefined:undefined,
                        deviceToken,
                        includeFirebaseToken:e.teacherProfile?e.teacherProfile.teacherIsActive:
                        e.Role=="TEACHER"?false:true,full_name})
                return {result:true,
                    authentication:{
                        teacherIsActive:e.teacherProfile?e.teacherProfile.teacherIsActive:
                        e.Role=="TEACHER"?false:undefined,
                        ...info,
                        isActive:Active,
                        isInfoComplet:!!userInfo,
                        materialSet:!!userInfo?(!!userInfo.preferred_materials?!!userInfo.preferred_materials.length:false):false,
                        full_name,
                        email,
                        phone_number,
                        teacherDocumentUploaded:e.teacherProfile&&e.teacherProfile.IDFrontImageURL!=""
                        ?true:
                        e.Role=="TEACHER"?false:undefined,
                    }}
                }
        })
    }else if(validator.isMobilePhone(username,null,{strictMode:true})){
        user = await prisma.user.findUnique({
            where:{
                phone_number:username
            },        
            include:{
                userInfo:true,
                select:{
                    preferred_materials:true,
                    education_LevelId:true,
                    Current_education_level:{
                        select:{
                            schoolTypeId:true
                        }
                    }
                }
            }
        }).then(async(e)=>{
            if(!e){
                return{error:"password does not match",result:false}
            }
            if(e.banned){
                return{error:"this account has been banned!",result:false}
            }

            const {userInfo,id,full_name,Role,email,phone_number,Active,password:userPassword}=e
            if(bcrypt.compareSync(password, userPassword)){
                const info = await loginToken({userid:id,role:Role,Activate:Active,email,phone_number,
                    teacherIsActive:e.teacherProfile?e.teacherProfile.teacherIsActive:
                        e.Role=="TEACHER"?false:undefined,
                        educationLevelId:userInfo?e.userInfo.education_LevelId:undefined
                        ,SchoolTypeId:userInfo?e.userInfo.Current_education_level?
                        e.userInfo.Current_education_level.schoolTypeId:undefined:undefined,
                        deviceToken,
                        includeFirebaseToken:e.teacherProfile?e.teacherProfile.teacherIsActive:
                        e.Role=="TEACHER"?false:true,full_name})
                return {result:true,
                    authentication:{
                        teacherIsActive:e.teacherProfile?e.teacherProfile.teacherIsActive:
                        e.Role=="TEACHER"?false:undefined,
                        ...info,
                        isActive:Active,
                        isInfoComplet:!!userInfo,
                        materialSet:!!userInfo?(!!userInfo.preferred_materials?!!userInfo.preferred_materials.length:false):false,
                        full_name,
                        email,
                        phone_number,
                        teacherDocumentUploaded:e.teacherProfile&&e.teacherProfile.IDFrontImageURL!=""
                        ?true:
                        e.Role=="TEACHER"?false:undefined,
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