import apollo from 'apollo-server'

const {gql}=apollo
const typeDefs=gql`
scalar DateTime

type Query{
  users:[User]
  getMaterials:[Materials]
  getCities:[City]
  getAreas(cityId:ID):[Area]
  getUserInfo(userId:ID!):UserInfo
  getMyInfo:UserInfo
  getEducationLevels:[Education_Level]
}
type Mutation{
  logout(userId:ID!,refreshToken:String!):Boolean!
  refreshToken(userId:ID!,refreshToken:String!):LoginResult!
  CreateMaterial(lookUp:lookUp,education_level: Education_Level_enum!):Boolean!
  addUser(data:UserInput!):LoginResult!
  addUserInfo(data:userInfoInput!):Boolean!
  login(username:String!,password:String!):LoginResult!
  resendActivationCode:Boolean!
  activateAccount(code:String!):LoginResult!
}
type User {
  id:ID!
  full_name:String!
  email:String!
  phone_number:String!
  Role:Role!
  username: String!
  Active: Boolean!
  userInfo: UserInfo
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
  Current_education_level:Education_Level_enum!
  preferred_materials:[ID]!
  address:String!
  City:ID!
  Area:ID!
}
type LoginResult {
  result:Boolean!
  error:String
  authentication:Authentication
}
type Authentication{
  token:String!
  refreshToken:String!
  userId:ID!
  full_name:String!
  email:String!
  phone_number:String!
  isActive:Boolean!
  isInfoComplet:Boolean
  materialSet:Boolean
  Role:Role!
}
type Result{
  error:String
  result:Boolean!
}
input UserInput{
  full_name:String!
  email:String!
  phone_number:String!
  password:String!
}
type Materials {
  id:ID!
  name:String!
  education_level: Education_Level!
}
type City{
  id:ID!
  name:String!
  latitude:String
  longitude:String
}
type Area{
  id:ID!
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
input DLookUp{
  ar:String!
  eng:String
  fr:String
}
type Education_Level{
  id:ID!
  name:String!
  education_level:Education_Level_enum!
}

enum Education_Level_enum {
  Kindergarten
  Primary_School
  Preparatory_Stage
  Secondary_School
  
  Preschool
  Elementary_School
  Middle_School
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