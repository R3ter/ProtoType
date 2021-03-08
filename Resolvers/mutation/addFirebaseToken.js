import admin from 'firebase-admin'
const addfirebaseToken=(parent,{deviceToken,token})=>{
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

    await db.collection("testToken").add({
        deviceToken,
        token
    })
    return true
}

export default addfirebaseToken