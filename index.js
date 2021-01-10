import apollo from 'apollo-server'
import pkg from '@prisma/client';
import Materials from "./Resolvers/types/Materials.js"
import typeDefs from './Resolvers/schema.js'
import Mutation from './Resolvers/Mutation.js'
import City from './Resolvers/types/City.js'
import Query from './Resolvers/Query.js'

const { ApolloServer } = apollo

const { PrismaClient } = pkg;
const prisma = new PrismaClient()



const server = new ApolloServer({
  typeDefs,
  resolvers:{ 
    Query,
    Mutation,
    Materials,
    City
  },
  formatError(error){
    if(!error.originalError){
      return error
    }
    if(error.extensions.exception.code=="P2002"){
      return({error:error.extensions.exception.meta.target+
      " already exists",code:error.originalError.code,data:error.originalError.data})
    }
    return({error:error.message,code:error.originalError.code,data:error.originalError.data})
  },
  context({req}){
    return {
      req,
      prisma
    }
}}
);

server.listen().then(({ url }) => {
    console.log(`Server is running at ${url}`);
});