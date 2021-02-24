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
