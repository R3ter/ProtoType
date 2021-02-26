// import apollo from 'apollo-server'
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
import {sendMessage} from  "./methods/messages/sendMessage.js" 
import Appointment from './Resolvers/types/Appointment.js'
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
    ...Appointment,
    teacherSchedule,
    CourseTag,
    
    TeacherMapInfo,
    Area,
    Education_Level,
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

// prisma.education_Level.create({
//   data:{
//     OneAndHalf:150,
//     ThreeHours:300,
//     TwoHours:200,
//     oneHour:100,
//     type:{
//       create:{
//         name:{
//           create:{
//             ar:"arabic school ar",
//             eng:"arabic school"
//           }
//         }
//       }
//     },
//     lookUp:{
//       create:{
//         ar:"elementary ar",
//         eng:"elementary"
//       }
//     },
    
//     }
// }).then((e)=>{console.log(e)})

// prisma.materials.create({
//   data:{
//     description:{
//       create:{
//         eng:"dwadsadwad",
//         ar:"asdadwdaw"
//       }
//     },
//     lookUp:{
//       create:{
//         ar:"dwawd",
//         eng:"math"
//       }
//     },
//     education_level:{
//       connect:{
//         id:"181be44a-2154-4d5f-9188-188d98444c88"
//       }
//     }
//   }
// }).then((e)=>console.log(e))
// prisma.user.update({
//   where:{
//     id:""
//   },
//   data:{
//     teacherProfile:{
//       create:{

//       }
//     }
//   }
// })

