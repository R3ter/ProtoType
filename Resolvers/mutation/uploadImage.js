import { checkToken } from "../../methods/Tokens.js"
import {uploadUserImage} from './../../methods/imageUploader.js'


const UploadImage=async(parent, {imageData}, {req,prisma}, info)=>{
    const {id} = checkToken({token:req.headers.token})
    return await uploadUserImage({imageData,
        public_id:id,
        suc:async(e)=>{
            return await prisma.userInfo.upsert({
                where:{
                  userId:id
                },
                create:{
                    image_URL:e.url,
                  user:{
                    connect:{
                      id
                    }
                  }
                },update:{
                    image_URL:e.url
                }
              }).then(()=>{
                  return true
              }).catch(()=>{
                  return false
              })
        },rej:(e)=>{
            console.log(e)
            return false
        }
})
}
export default UploadImage