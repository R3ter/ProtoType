// import admin from 'firebase-admin';

// ///////////////////////////////npm uninstall firebase 
// import firebase from "firebase";

// firebase.initializeApp( {
//   apiKey: "AIzaSyDdojQ8np88pGmLd1rC7B7lxEC8RdnWpZc",
//   authDomain: "school-92b2c.firebaseapp.com",
//   databaseURL: "https://school-92b2c-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "school-92b2c",
//   storageBucket: "school-92b2c.appspot.com",
//   messagingSenderId: "1046635118653",
//   appId: "1:1046635118653:web:8e709079978ded68b4aa54",
//   measurementId: "G-4EX63WVC0M"
// });



// admin.initializeApp({
//   credential: admin.credential.cert({
//     "type": "service_account",
//     "project_id": "school-92b2c",
//     "private_key_id": "90ff85bffbd83e06113bd959fa60600dfd7d5a53",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCxtNMhjtCkwzqq\n7reBzuJtO7jhYp5EcoTCcHJAm0wqMq1wUc4DcQNT8dRJ5EeyhV6vlThOiynZPVYM\nzH4ziS6e1pibf7t5/r7IqMFICk495e5xa6BpQVyjpC/T3t3mqSJKKM43jM6DNEIb\nUa3ym6fGeAur6FGbymgMBjmfZYNt4hk2HRJCO5TX6M+0dZAXNPUZ+ndhK4b16Sxd\n5QhBUZbU4JHv5eppE2U0a1sMZQ8/uS1AUm29OFdgCcxAo8wBOz40HDINUogztZqG\nDedlPgn22adPDvsH8r/09c1MeRZPGqb5YIs4mlWtZ5Vd6IrY87ipbRja73IsAK6q\nxt6Me6GpAgMBAAECgf84oaenH3GJEFkMoDFa7NNmfDcu8dP+JtX9dlhIE+BHPQne\nAYk7D4jqojvvpbrePs0t/MqKPU8uK/Mq9lWW7DYvPbQ52eWlEHSRqItFVK4ai8Fb\n49tQWm7At6eGSD/vLMyrVYBiXj0caEr+Px7FcgAa/6a4jLt1KnZ+CSh+jkXpfjG0\nZqA3S6iCGOWILh0Nu+TQeM0ry94qC5+nrZKXAT9Bmgs5iESBFygqbrsUziM/+C+P\nCuNn5rJL7Hbnt6OBvI5P72Uzi6JjOoi1gbhKK5uVZvIrweQSWqegEJx0+a1x/2Lv\nP/qI8zH8MJAH04b79xQYs8OaD4jSUioTlZiBGQECgYEA26V7hw37C7GExv02rnwX\nvEaOLgkZn65WMqsq2DbnN1DmzhQEyDw7eBkkRoCdT1rQjjmZqbAlUfG3IwkHy3h5\nzh0jVUn/qk1+G8zQ8ID8bYpiSxk9hsTUW5+ZvdiYA/ccemmEx3BRxtYHPNXoT0zw\nCCqvQ0UdbXHGmVFriiEIeoECgYEAzx5SlQkXWm+XUtXcXZqL/2hfHC4vl2MKnpfk\nnphsdCNvzUtMG4XvN1nBQoZv/GMiWedpLVUfQG41E+t3x1lLTv0c0eADGsZ7uooK\nuD/ceV8ZZFlEDghMfPp0ruTVZ9bKJGg08bIE5NBqZOoltLBirOb68BaARGC6Qh/V\nKtNwgykCgYA2h1ipaLEgcAu0kvxWSPxjg2icySmRWOiRX6kdUFQKiY0jMBkX1Mw2\nvpcg4aEsKDGKfYZGeDJrq4R5sC49N0WWA+nXrK1KDD74i9p7OqpwT2CjoDqEEK1f\nqbmzRehHY7uwMC4EjT/gCxZ05e3scf9NJ7unCauKliplua7m9dhzAQKBgHoRU/iU\nWBgrxpLCilL8f+AywkNYkSH29E5OFSbHjLvSGtVyuFNMV5VWp8kudJfaUWeNNHbM\nQVP23/9yerCZ1wGhubeUACBqtIdXTkQTFzzNKKj012Ax0eqirdxZ79B4TcCxTerY\n0XuNvfbl7P0WK8HdjC2uBUDHhV7tZfQMk7YpAoGAUoYf9cMaMT5pVOfN7M2NG+eq\nxIHIKaiqpPHOMuBVVAtJbOJPt0AIyP2m2YtsySz9PwrCwsO4EIXwpypSy+5v3f8i\nESO+e61eyVwmOPIpv/YCzeCTP5zxn7tdmx4shwW7nRRjXfq+AQKg7gQuCBWmcDIS\nzWo1BpJF3705E3Qeqp0=\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-bxya3@school-92b2c.iam.gserviceaccount.com",
//     "client_id": "102243599954556365847",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bxya3%40school-92b2c.iam.gserviceaccount.com"
//   }
//   ),
//   databaseURL: "https://school-92b2c-default-rtdb.europe-west1.firebasedatabase.app"
// });


// firebase.auth().signInWithEmailAndPassword("waleed.sukhon77@gmail.com", "waleed23")
//   .then((e) => {
//     e.user.getIdTokenResult().then((token)=>{
//         var message = {
//             data: {
//             score: '850',
//             time: '2:45'
//             }
//         ,token:token.token
//       };
//       admin.messaging().send(message)
//       .then((response) => {
//         console.log('Successfully sent message:', response);
//       })
//       .catch((error) => {
//         console.log('Error sending message:', error);
//       });
//     })
//   })
//   .catch((error) => {
//     console.log(error)
//   });