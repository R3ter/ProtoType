import cloudinary from 'cloudinary'
cloudinary.config({ 
    cloud_name: 'dvianqaag', 
    api_key: '446968123697715', 
    api_secret: '132Vq48XxuEuSji0uhHQ4dirP0I' 
});
const uploadUserImage=async ({
    imageData,public_id,suc,rej
})=>{
    return await cloudinary.v2.uploader.upload(imageData,
    { public_id }
    ).then((result)=>{
        return suc(result)
    }).catch((error)=>{
        return rej(error)
    })
}
export {uploadUserImage}
export default cloudinary