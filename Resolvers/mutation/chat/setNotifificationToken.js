import { saveTokenInFirebase } from "../../../methods/Tokens.js"

const setNotifificationToken=(parent,{data:{
    userToken,
  deviceToken
}})=>{
    saveTokenInFirebase({
        token:userToken,
        deviceToken
    })
}

export default setNotifificationToken