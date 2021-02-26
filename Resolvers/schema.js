import apollo from 'apollo-server'

const {gql}=apollo
const typeDefs=gql`
scalar DateTime
scalar Time

type Query{
  users:[User]
  getMaterials(skip:Int,take:Int):[Materials]
  getBookingInfo(data:ConfirmBookingInput!):ConfirmBooking!
  getCities:[City]
  getMaterialInfo(materialID:ID!):Materials
  getHomeWorksPackges(materialID:ID!):[HomeWorkPackage]!
  getAreas(cityId:ID):[Area]
  getUserInfo(userId:ID!):UserInfo
  getMyInfo:UserInfo
  getEducationLevels(schoolTypeId:ID!):[Education_Level]
  getBestTeachers:[TeacherProfile]
  getCourseTags(search:String):[CourseTag]
  BestMaterials:[Materials]
  getTeacherReviews(teacherID:ID!):[TeacherReview]
  getTeacherCourses(teacherID:ID!,take:Int,skip:Int):[Materials]
  getTeacherInfo(teacherID:ID!):TeacherProfile
  getTeacherAppointments(teacherID:ID!,
    timeType:courseHoursType!,
    date:DateTime!):[teacherSchedule]
  getMaterialReviews(materialId:ID!,skip:Int,take:Int):[MaterialReview]
  getMyBooking(skip:Int,take:Int,stateKey:String):[Appointment]
  getSchoolTypes:[SchoolType]!
  getTeachersOnMap:MapInfo!
  getPopularTeacher(skip:Int,take:Int):[TeacherProfile]
  getClassStudents(courseID:ID!):[User]
  getMaterialTeachers(materialID:ID!,take:Int,skip:Int):[User]!
}
type Mutation{
  sendMessage(toId:ID!,message:String!):Boolean!
  teacherConnectToMaterial(materialID:ID!):Boolean!
  addMaterialRevew(data:MaterialReviewInput!):Boolean!
  changeMyPassword(currentPassword:String!,newPassword:String!):Result!
  editProfileInfo(data:userInfoInput!):Boolean!
  addTeacherWorkTimes(fromTo:[fromToInput!]!):Boolean!
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
input fromToInput{
  from:DateTime!
  to:DateTime!
}
input ConfirmBookingInput{
  dateTime:DateTime!
  courseId:ID!
  courseHoursType:courseHoursType! 
  homeWorkPackageID:ID
  studentCount:Int!
}
type ConfirmBooking{
  date:String!
  from:String!
  to:String!
  priceBeforeDiscount:Float!
  finalPrice:Float!
  coursePrice:Float!
  discountPercentage:Float!
  TaxPercentage:Float
}
type fromTo{
  from:DateTime!
  to:DateTime!
}
type HomeWorkPackage{
  id:ID
  price:Float
  MaterialId:String
  name:String
}
input AppointmentInput{
  teacherId:ID!
  studentCount:Int!
  dateTime:String!
  homeWorkPackageID:ID
  courseId:ID!
  courseHoursType:courseHoursType! 
  note:String
}
type BookingData {
  studentCount:Int!
  dateTime:DateTime!
  date:DateTime!
  note:String!
  from:String!
  to:String!
  materialsId:ID!
  courseHoursType:String!
  price:Int!
  teacherId:ID!
}
input MaterialReviewInput{
  materialId:ID!
  review:String!
  ratingStars:Int!
}
enum courseHoursType{
  oneHour
  OneAndHalf
  TwoHours
  TwoAndHalf
  ThreeHours
  
  train
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
  info:String
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
  teacherProfile:TeacherProfile
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
  time:fromTo!
  day:String!
  state:Appointment_state
}
type Appointment_state{
  id:ID!
  name:String!
  color:String!
}
type TeacherProfile{
  id:ID!
  user:User!
  description:String!
  address:String
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
  time:fromTo!
  date:String!
  course:Materials!
  coursePrice:Float!
  state: Appointment_state!
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