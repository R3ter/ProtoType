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
import "./methods/messages/sendMessage.js" 

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
// prisma.area.create({
//   data:{
//     name:"",
//     longitude:"",
//     latitude:"",
//     City:{
//       connect:{
//         id:"a1b4caec-d651-4d8a-b7d2-5104eadc9567"
//       }
//     },
//     lookUp:{
//       create:{
//         eng:"jerusalem",
//         ar:"ar jerusalem"
//       }
//     }
//   }
// }).then((e)=>{
//   console.log(e)
// })


// prisma.teacherProfile.create({
//   data:{
//     user:{
//       connect:{
//         id:"a8257846-6206-4d9b-ab17-6657cfb4401a"
//       }
//     },
//     address:"wra el jam3",
//     City:{
//       connect:{
//         id:"a1b4caec-d651-4d8a-b7d2-5104eadc9567"
//       }
//     },
//     Area:{
//       connect:{
//         id:"bcb2c421-8034-4531-88a1-788d7bbe6d5f"
//       }
//     },
//     email:"waleed.sukhon@dawsad.sad",
//     phone:"810237",
//     description:{
//       create:{
//         ar:"wadadw",
//         eng:"adwadsad"
//       }
//     }
//   }
// }).then(e=>console.log(e))

server.listen(process.env.PORT||4000).then(({ url }) => {
  console.log(`Server is up at ${url}`);
});

// prisma.materials.create({
//   data:{
//     description:{
//       create:{
//         ar:"sadwa",
//         eng:"sadwad"
//       }
//     },
//     education_level:{
//       connect:{
//         id:"14229336-2a5e-47d0-8f67-ece5f9d825aa"
//       }
//     },
//     teacher:{
//       connect:{
//         id:"a8257846-6206-4d9b-ab17-6657cfb4401a"
//       }
//     },
//     lookUp:{
//       create:{
//         ar:"arabic",
//         eng:"english"
//       }
//     },
//     tags:{
//       connect:[
//         {id:"6c23a3bb-1fae-4e9d-a7e3-4796e95e4f8e"},{
//         id:"bdfa6658-90df-4446-b79d-0e33033762ce"
//       }]
//     },
//     TeacherProfile:{
//       connect:{
//         teacherId:"a8257846-6206-4d9b-ab17-6657cfb4401a"
//       }
//     },
//     UserInfo:{
//       connect:{
//         userId:"a8257846-6206-4d9b-ab17-6657cfb4401a"
//       }
//     }
//   }
// }).then((e)=>console.log(e))
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

// prisma.user.update({
//   where:{
//     id:"e26be7ef-3174-41b2-bec4-99d658eea851"
//   },
//   data:{
//     userInfo:{
//       create:{
//         latitude:""
//       }
//     }
//   }
// }).catch((e)=>{
//   console.log(e)
// })
// prisma.user.update({
//   where:{
//     id:"e26be7ef-3174-41b2-bec4-99d658eea851"
//   },
//   data:{
//     Role:"TEACHER",
//     teacherProfile:{
//       create:{
//         description:{
//           create:{
//             ar:"",
//             eng:""
//           }
//         }
//       }
//     }
//   }
// }).then((e)=>{
// console.log(e)
// }).catch((e)=>{
//   console.log(e)
// })

// prisma.userInfo.upsert({
//   where:{
//     userId:"e26be7ef-3174-41b2-bec4-99d658eea851"
//   },
//   create:{
//     preferred_materials:{
//       connect:[{
//         id:"6c23a3bb-1fae-4e9d-a7e3-4796e95e4f8e"
//       }]
//     }
//   },
//   update:{
//     preferred_materials:{

//       set:{
//         id:"6c23a3bb-1fae-4e9d-a7e3-4796e95e4f8e"
//       }
//     }
//   },
//   include:{
//     preferred_materials:true
//   }
// }).then((e)=>console.log(e))
// prisma.education_Level.create({
//   data:{
//     education_level:"Elementary_School",
//     FourHours:400,
//     OneAndHalf:150,
//     ThreeAndHalf:350,
//     TwoHours:200,
//     ThreeHours:300,
//     oneHour:100,
//     lookUp:{
//       create:{
//         ar:"Elementary",
//         eng:"Elementary"
//       }
//     }
//   }
// }).then(e=>console.log(e))

// prisma.materials.create({
//   data:{
    
//     lookUp:{
//       create:{
//         ar:"ar math",
//         eng:"eng math"
//       }
//     },

//     education_level:{
//       connect:{
//         education_level:"Elementary_School"
//       }
//     }
//   }
// }).then(e=>console.log(e))

// prisma.teacherProfile.update({
//   where:{
//     teacherId:"e6152a46-6b36-4836-b96d-78c0b9abcd36"
//   },
//   data:{
//     Materials:{
//       connect:{
//         id:"62e88255-7a2d-4f97-923d-7df46f14053e"
//       }
//     }
//   }
// }).then(e=>console.log(e))

// prisma.materials.update({
//   where:{
//     id:"ee812625-079e-4284-be18-2106c87b72bf"
//   },
//   data:{
//     teachersID:{
//       set:["c84c2f01-b32d-42bc-9f5f-f4992c53574b"]
//     }
//   }
// }).then(e=>console.log(e))

// prisma.materials.findFirst({
//   where:{
//       id:"62e88255-7a2d-4f97-923d-7df46f14053e",
//       teachersID:{
//         has:""
//       }
//   },
//   include:{
//     teachers:true
//   }
// }).then((e)=>console.log(e))

// prisma.education_Level.create({
//   data:{
//     FourHours:400,
//     OneAndHalf:150,
//     ThreeAndHalf:350,
//     ThreeHours:300,
//     TwoHours:200,
//     education_level:"Elementary_School",
//     oneHour:100,
//     lookUp:{
//       create:{
//         ar:"Elementary",eng:"Elementary"
//       }
//     },
//     type:{
//       connect:{
//         schoolType:"arabic_school"
//       }
//     }
//   }
// }).then((e)=>console.log(e))



// prisma.materials.create({
//   data:{
//     education_level:{
//       connect:{
//         education_level:"Elementary_School"
//       }
//     },
//     description:{
//       create:{
//         ar:"",
//         eng:""
//       }
//     },
//     lookUp:{
//       create:{
//         ar:"math ar",
//         eng:"math eng"
//       }
//     }
//   }
// }).then((e)=>console.log(e))

prisma.materials.findUnique({
  where:{
    id:materialID
},include:{
    teachers:{
      skip,take,
        select:{
            full_name:true,
            id:true,
            userInfo:{
                select:{
                    Current_education_level:{
                        select:{
                            lookUp:true
                        }
                    },
                longitude:true,
                latitude:true,
                image_URL:true,
                cover_URL:true,
                about:true
            }
        }
    }
}
}
})