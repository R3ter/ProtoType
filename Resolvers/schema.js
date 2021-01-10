import apollo from 'apollo-server'

const {gql}=apollo

const typeDefs=gql`
scalar DateTime
type User {
  id:ID!
  first_name:String
  last_name:String
  email:String!
  phone_number:String!
  Role:Role!
  username: String!
  Active: Boolean!
  userInfo: UserInfo
}
type Query{
  users:[User]
  materials:[Materials]
  cities:[City]
  getUserInfo(userId:ID!):UserInfo
  getMyInfo:UserInfo
}
type UserInfo{
  birth_date:String
  Current_education_level:Education_Level
  preferred_materials:[Materials]
  address:String
  City:City
  Area:Area
}
input userInfoInput{
  birth_date:DateTime
  Current_education_level:Education_Level!
  preferred_materials:[ID]!
  address:String!
  City:ID!
  Area:ID!
}
type Mutation{
  CreateMaterial(lookUp:lookUp):Materials!
  addUser(data:UserInput!):Result!
  addUserInfo(data:userInfoInput!):Boolean!
  login(username:String!,password:String!):Authentication!
}
type Result{
  error:String
  result:Boolean!
}
input UserInput{
  username:String!
  first_name:String!
  last_name:String!
  email:String!
  phone_number:String!
  password:String!
}

type Authentication{
  token:String!
  refreshToken:String!
}
type Materials {
  name:String!
}
type City{
  id:ID!
  name:String!
  latitude:String
  longitude:String
}
type Area{
  name:String
  City:City
  latitude:String
  longitude:String
}
input lookUp{
  eng:String!
  ar:String!
  fr:String
}
enum Education_Level {
  Preschool
  Primary_School
  Elementary_School
  Middle_School
  Secondary_School
  High_School
  Diploma
  Doctorate
}
enum Role {
  STUDENT
  TEACHER
}
`;

export default typeDefs