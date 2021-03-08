import admin from 'firebase-admin'
const addfirebaseToken=async(parent,{deviceToken,Token})=>{
    await admin.messaging().sendToDevice(
       deviceToken,
        {
        notification: {
            title: 'wesal??',
            body : '????'
        }
    }).then((e)=>{
        console.log(e)
    }).catch((e)=>{console.log(e)})

    await admin.firestore().collection("testToken").add({
        deviceToken,
        Token
    })
    return true
}

export default addfirebaseToken