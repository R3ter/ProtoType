import { saveTokenInFirebase } from "../../../methods/addNotification.js"

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