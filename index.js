// import apollo from 'apollo-server'
import './methods/firebaseInitializeApp.js'
import pkg from '@prisma/client';
import Materials from "./Resolvers/types/Materials.js"
import typeDefs from './Resolvers/schema.js'
import Mutation from './Resolvers/Mutation.js'
import City from './Resolvers/types/City.js'
import Area from './Resolvers/types/Area.js'
import CourseTag from './Resolvers/types/CourseTag.js'
import Education_Level from './Resolvers/types/Education_Level.js'
import TeacherProfile from './Resolvers/types/TeacherProfile.js'
import Query from './Resolvers/Query.js'
import apolloServer from 'apollo-server';
import teacherSchedule from './Resolvers/types/WorkingHour.js'
import TeacherMapInfo from './Resolvers/types/TeacherMapInfo.js'
import SchoolType from './Resolvers/types/SchoolType.js'
import Appointment from './Resolvers/types/Appointment.js'
import Authentication from "./Resolvers/types/Authentication.js"
import momentZone from "moment-timezone"
import TeacherInfo from './Resolvers/types/TeacherInfo.js'
import TeacherApplication from './Resolvers/types/TeacherApplication.js'
import Major from './Resolvers/types/Major.js'
import User from './Resolvers/types/User.js'
momentZone.tz.setDefault("Asia/Jerusalem")

// console.log(momentZone.tz.names().map((e)=>console.log(e)))
const { ApolloServer} = apolloServer

const { PrismaClient } = pkg;
const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs,
  resolvers:{
    Query,
    Mutation,
    Materials,
    SchoolType,
    City,
    Major,
    ...Appointment,
    teacherSchedule,
    CourseTag,
    User,
    Authentication,
    TeacherApplication,
    TeacherMapInfo,
    Area,
    Education_Level,
    TeacherInfo,
    TeacherProfile
  },
  introspection: true,
  playground: true,
  // formatError(error){
  //   if(error.extensions.exception.code=="P2002"){
  //     return({message:error.extensions.exception.meta.target+
  //     " already exists",code:error.originalError.code,data:error.originalError.data})
  //   }
  //   if(error.message=='Unauthenticate'){
  //     return({message:"Unauthenticate",statusCode:401})
  //   }
  //   return error
  //   // return({message:error.message,code:error.originalError.code,data:error.originalError.data})
  // },
  context({req}){
    return {
      req,
      prisma
    }
  }}
);


server.listen(process.env.PORT||4000).then(({ url }) => {
  console.log(`Server is up at ${url}`);
});


// prisma.appointment_state.create({
//   data:{
//     Appoitment_state_key:"rejected",
//     color:"#800000",
//     name:{
//       create:{
//         ar:"مرفوض",
//         eng:"rejected"
//       }
//     }
//   }
// }).then((e)=>console.log(e))


// prisma.user.create({
//   data:{
//     email:"admin@test.com",
//     password:"waleed",
//     full_name:"waleed",
//     phone_number:"4234234324"
//   }
// }).then((e)=>console.log(e))


// prisma.materials.updateMany({
//   where:{},data:{
    
//   }
// })

// prisma.homeWorkPackage.deleteMany({where:{}}).then((e)=>console.log(e))

// prisma.materials.findMany({}).then((e)=>{
//   e.map(async (e)=>{
//     await sleep(10000)
//     await prisma.homeWorkPackage.create({
//       data:{
//         name:"10 واجبات",
//         price:20,
//         MaterialId:e.id
//       }
//     })
//     await sleep(10000)
//       await prisma.homeWorkPackage.create({
//         data:{
//           name:"15 واجبات",
//           price:25,
//           MaterialId:e.id
//         }
//       })
//       await sleep(10000)
//         await prisma.homeWorkPackage.create({
//           data:{
//             name:"25 واجبات",
//             price:30,
//             MaterialId:e.id
//           }
//         })
//   })
//   console.log(e)
// })

// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   })
// }

// prisma.major.create({
//   data:{
//     name:{
//       create:{
//         ar:"دستور",
//         eng:"Constitution"
//       }
//     }
//   }
// }).then((e)=>console.log(e))


