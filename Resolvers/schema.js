import apollo from 'apollo-server'

const {gql}=apollo
const typeDefs=gql`
scalar DateTime
scalar Time

type Query{
  users:[User]
  getMaterials(skip:Int,take:Int):[Materials]
  getCities:[City]
  getMaterialInfo(materialID:ID!):Materials
  getAreas(cityId:ID):[Area]
  getUserInfo(userId:ID!):UserInfo
  getMyInfo:UserInfo
  getEducationLevels(schoolTypeId:ID!):[Education_Level]
  getBestTeachers:[TeacherProfile]
  getCourseTags(search:String):[CourseTag]
  BestMaterials:[Materials]
  getTeacherReviews(teacherID:ID!):[TeacherReview]
  getTeacherCourses(teacherID:ID!):[Materials]
  getTeacherInfo(teacherID:ID!):TeacherProfile
  getTeacherAppointments(teacherID:ID!,
    date:String!):[teacherSchedule]
  getMyBooking:[Appointment]
  getSchoolTypes:[SchoolType]!
  getTeachersOnMap:MapInfo!
  getPopularTeacher(skip:Int,take:Int):[Materials]
  getClassStudents(courseID:ID!):[User]
}
type Mutation{
  changeMyPassword(currentPassword:String!,newPassword:String!):Result!
  editProfileInfo(data:userInfoInput!):Boolean!
  addTeacherWorkTimes(fromTo:[fromTo!]!):Boolean!
  addAppointment(data:AppointmentInput!):Boolean!
  becomeaTeacher(message:String!):Boolean!
  TeacherAddMaterial(data:MaterialsInput):Result
  logout(userId:ID!,refreshToken:String!):Boolean!
  refreshToken(userId:ID!,refreshToken:String!):LoginResult!
  CreateMaterial(lookUp:lookUp,education_levelID:ID!):Boolean!
  addUser(data:UserInput!):LoginResult!
  addUserInfo(data:userInfoInput):Boolean!
  login(username:String!,password:String!):LoginResult!
  resendActivationCode:Boolean!
  uploadUserImage(imageData:String!):Boolean!
  activateAccount(code:String!):LoginResult!
}
input fromTo{
  from:DateTime!
  to:DateTime!
}
input AppointmentInput{
  teacherId:ID!
  studentCount:Int!
  dateTime:String!
  courseId:ID!
  courseHoursType:courseHoursType! 
  note:String
}
enum courseHoursType{
  oneHour
  OneAndHalf
  TwoHours
}
type MapInfo{
  teachers:[TeacherMapInfo]
  centerLongitude:String
  centerLatitude:String
}
type SchoolType{
  id:ID!
  name:String!
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
  about:String
  City:City
  Area:Area
}
input userInfoInput{
  image_URL:String
  birth_date:DateTime
  Current_education_level_ID:ID
  preferred_materials:[ID]
  address:String
  longitude:String
  about:String
  latitude:String
  City:ID
  full_name:String
  Area:ID
}
type teacherSchedule{
  time:String!
  day:String!
  state:Int!
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
  register:Int!
  workingDays:[workingDay]
}
type workingDay{
  id:ID!
  day:Day 
  hours:[WorkingHour]
  teacherId:String!
}
type WorkingHour{
  id:ID!
  workingDay:workingDay
  workingDayId:String 
  booked:Boolean!
  userBooked:Boolean!
  hour:Int
}
type Appointment{
  id: ID!
  time:String!
  date:String!
  course:Materials!
  coursePrice:Float!
  state:Int!
  userId:ID!
  user:User!
  courseHoursType:courseHoursType!
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
  isInfoComplet:Boolean!
  materialSet:Boolean!
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
  studentImages:[String]
}
input MaterialsInput {
  name:lookUp!
  image_URL:String
  description:DLookUp
  education_levelID:ID!
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
}
type CourseTag{
  id:ID!
  name:String!
}
enum Day {
  sunday
  monday
  tuesday
  wednesday
  thursday
  friday
  saturday
}
enum Role {
  STUDENT
  TEACHER
}
`;

export default typeDefs