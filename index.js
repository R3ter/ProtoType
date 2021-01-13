// import apollo from 'apollo-server'
import pkg from '@prisma/client';
import Materials from "./Resolvers/types/Materials.js"
import typeDefs from './Resolvers/schema.js'
import Mutation from './Resolvers/Mutation.js'
import City from './Resolvers/types/City.js'
import Query from './Resolvers/Query.js'
import express from 'express';
import apolloServer from 'apollo-server';
import { checkActivationCode } from './methods/activate.js';


const { ApolloServer} = apolloServer


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
  introspection: true,
  playground: true,
  formatError(error){
    if(error.extensions.exception.code=="P2002"){
      return({message:error.extensions.exception.meta.target+
      " already exists",code:error.originalError.code,data:error.originalError.data})
    }
    return({message:error.message,code:error.originalError.code,data:error.originalError.data})
  },
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
// const app = express();
// server.applyMiddleware({ app });
// app.listen({ port: process.env.PORT||4000 }, () =>{
//   console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
// }
// );
// prisma.user.deleteMany().then((e)=>{
//   console.log(e)
// })
// app.get("/activateAccount", async (req,res)=>{
//   if(!req.query.userId||!req.query.code){
//     return res.sendStatus(404);
//   }
//   await checkActivationCode(req.query.code,req.query.userId, async ()=>{
//     await prisma.user.update({where:{email:email},
//       data:{Active:true}
//     })
//     return res.send("succ")
// },async ()=>{
//   return res.send("error")
// })
  
// })