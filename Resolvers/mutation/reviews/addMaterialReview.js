import { checkToken } from "../../../methods/Tokens.js"
  
const materialReview= async(parent,{data:{materialId,review,ratingStars}},{prisma,req},info)=>{
    const {id}=checkToken({token:req.headers.token})
    if(review.length>2000){
        return false
    }
    if(ratingStars>5||ratingStars<0){
        return false
    }
    return await prisma.materialReview.upsert({
        where:{
            userAndMaterialId:id+materialId
        },
        create:{
            userAndMaterialId:id+materialId,
            ratingStars,review,
            material:{
                connect:{
                    id:materialId
                }
            },
            user:{
                connect:{
                    id
                }
            }
        },update:{
            review,ratingStars
        }
    }).then((e)=>!!e)
    .catch(()=>false)
}
export default materialReview