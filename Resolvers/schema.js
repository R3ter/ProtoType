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
  getBestTeachers:[TeacherProfile]
  getCourseTags(search:String):[CourseTag]
  BestMaterials:[Materials]
  getTeacherReviews(teacherID:ID!):[TeacherReview]
  getTeacherCourses(teacherID:ID!):[Materials]
  getTeacherInfo(teacherID:ID!):TeacherProfile
  getTeacherAppointments(teacherID:ID!,day:String!,
    month:String!,year:String!):[Appointment]
  getTeachersOnMap:MapInfo!
}
type Mutation{
  addAppointment(data:AppointmentInput!):Boolean!
  becomeaTeacher(message:String!):Boolean!
  TeacherAddMaterial(data:MaterialsInput):Result
  logout(userId:ID!,refreshToken:String!):Boolean!
  refreshToken(userId:ID!,refreshToken:String!):LoginResult!
  CreateMaterial(lookUp:lookUp,education_level: Education_Level_enum!):Boolean!
  addUser(data:UserInput!):LoginResult!
  addUserInfo(skipedMaterials:Boolean,skipedInfo:Boolean,data:userInfoInput):Boolean!
  login(username:String!,password:String!):LoginResult!
  resendActivationCode:Boolean!
  uploadUserImage(imageData:String!):Boolean!
  activateAccount(code:String!):LoginResult!
}
input AppointmentInput{
  teacherId:ID!
  time:String!
  day:String!
  month:String!
  year:String!
  note:String
}
type MapInfo{
  teachers:[TeacherMapInfo]
  centerLongitude:String
  centerLatitude:String
}
type TeacherMapInfo{
  id:ID!
  full_name:String!
  ratingStars:Int!
  count:Int!
  phone_number:String!
  email:String!
  description:String
  image_URL:String
  longitude:String
  latitude:String
}
type User {
  id:ID!
  full_name:String!
  email:String!
  phone_number:String!
  Role:Role!
  Active: Boolean!
  userInfo: UserInfo
}
type UserInfo{
  birth_date:String
  user:User!
  Current_education_level:Education_Level
  preferred_materials:[Materials]
  address:String
  longitude:String
  latitude:String
  image_URL:String
  cover_URL:String
  City:City
  Area:Area
}
input userInfoInput{
  birth_date:DateTime
  Current_education_level:Education_Level_enum
  preferred_materials:[ID]
  address:String
  longitude:String
  latitude:String
  City:ID
  Area:ID
}
type TeacherProfile{
  id:ID!
  user:User!
  description:String!
  address:String
  City:City
  Area:Area
  subjects:[CourseTag]
  # Courses:[Materials]
  # reviews:[TeacherReview]
  # appointments:[Appointment]
  courseCount:Int!
  averageRating:Int!
  ratingCounts:Int! 
}
type Appointment{
  id: ID!
  time:String!
  day:String!
  month:String!
  year:String!
  state:Int!
  user:User!
  teacher:User!
}
type TeacherReview{
  id:ID
  teacherId:ID
  ratingStars:Int
  review:String
  student:User
  teacher:User
  createdAt:DateTime 
}
type MaterialReview{
  id:ID
  materialID:ID
  ratingStars:Int
  review:String
  user:User
  createdAt:DateTime
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
  skipedInfo:Boolean
  skipedMaterials:Boolean
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
  id: ID!
  name:String!
  image_URL:String
  teacher:User!
  description:String
  education_level:Education_Level!
  tags:[CourseTag]
  reviews:[MaterialReview]
  averageRating:Int!
  ratingCounts:Int!
}
input MaterialsInput {
  name:lookUp!
  image_URL:String
  description:DLookUp
  education_level:Education_Level_enum!
  courseTags:[ID]!
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
type CourseTag{
  id:ID!
  name:String!
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