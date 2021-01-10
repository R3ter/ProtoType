import  jwt from 'jsonwebtoken';
const secret="dwawadhawbfhjavbffbhwafafwawf"

const loginToken=async(userid,role)=>{
    const token = await jwt.sign({ id: userid,Role:role }, secret,{ expiresIn: '1h' });
    return {token,refreshToken:""}
}
const checkToken=(token)=>{
    if (token) {
        try{
            return {...jwt.verify(token, secret)}
        }catch(e){
            throw new Error('Authentication required')
        }
    }
    throw new Error('Authentication required')
}

export {loginToken,checkToken}