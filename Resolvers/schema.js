import apollo from 'apollo-server'

const {gql}=apollo
const typeDefs=gql`
scalar DateTime
scalar Time

type Query{
  getMyTeacherReviews(skip:Int,take:Int):[TeacherReview]!
  getMyStudentReviews(skip:Int,take:Int):[StudentReview]!
  getTeachersForAdmin(skip:Int,take:Int,active:Boolean):[TeacherApplication]!
  getAppointmentsForAdmin(skip:Int,take:Int,state:StateTime!):[Appointment]!
  getUserChatProfile(userId:ID!):ChatInfo!
  teacherSearch(word:String!):[TeacherInfo]
  getMyTeacherInfo:TeacherInfo
  getMyTeacherBooking(skip:Int,take:Int,state:StateTime!):[Appointment]!
  getMyWorkingHours:[workingDay]
  getMaterialsForRegister(educationLevelId:ID!):[Materials]
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
  getTeacherInfo(teacherID:ID!):TeacherInfo
  getTeacherAppointments(teacherID:ID!,
    timeType:courseHoursType!,
    date:DateTime!):[teacherSchedule]
  getMyBooking(skip:Int,take:Int,state:StateTime!):[Appointment]
  getSchoolTypes:[SchoolType]!
  getMyEducationLevels:[Education_Level]
  getTeachersOnMap:MapInfo!
  getPopularTeacher(skip:Int,take:Int):[TeacherProfile]
  getClassStudents(courseID:ID!):[User]
  getMaterialTeachers(materialID:ID!,take:Int,skip:Int):[User]!
}
type Mutation{
  deleteMaterial(materialID:ID!):Boolean!
  deleteEducationLevel(education_LevelId:ID!):Boolean!
  createEducationLevel(data:educationLevelInput!):Boolean!
  createMaterial(data:materialData!):Boolean!
  adminAcceptTeacherApplication(teacherId:ID!):Boolean!
  adminRejectAppointment(AppointmentID:ID!):Boolean!
  adminAcceptAppointment(AppointmentID:ID!):Boolean!
  addTeacherInfo(data:teacherInfoInput!):Boolean!
  addTeacherDocument(data:TeacherDocumentInput!):Boolean!
  rejectAppointment(rejectionReason:String!,AppointmentID:ID!):Boolean!
  teacherAcceptAppointment(AppointmentID:ID!):Boolean!
  sendMessage(toId:ID!,message:String!,isImage:Boolean,attachments:[String]):Boolean!
  teacherConnectToMaterial(materialID:ID!):Boolean!
  changeMyPassword(currentPassword:String!,newPassword:String!):Result!
  editProfileInfo(data:userInfoInput):Boolean!
  addTeacherWorkTimes(fromTo:[fromToInput!]!):Boolean!
  addAppointment(data:AppointmentInput!):Boolean!
  becomeaTeacher(message:String!):Boolean!
  TeacherAddMaterial(data:MaterialsInput):Result
  logout(userId:ID!,refreshToken:String!):Boolean!
  refreshToken(userId:ID!,refreshToken:String!):LoginResult!
  CreateMaterial(lookUp:lookUp,education_levelID:ID!):Boolean!
  addUser(data:UserInput!):LoginResult!
  addUserInfo(data:userInfoInput):Boolean!
  login(username:String!,password:String!,deviceToken:String):LoginResult!
  resendActivationCode:Boolean!
  uploadUserImage(imageData:String!):Boolean!
  activateAccount(code:String!):LoginResult!
  setNotifificationToken(data:notificationData!):Boolean
  addReviewForTeacher(teacherId:ID!,review:String!,ratingStars:Float!):Boolean!
}
type TeacherApplication{
  id:ID!
  IDFrontImageURL:String
  IDBackImageURL:String
  certificateURL:String
  CV_URL:String
  image_URL:String
  name:String!
  createdAt:DateTime!
  updatedAt:DateTime!
}
input EducationLevelPrice{
  oneHour:Float!
  OneAndHalf:Float!    
  TwoHours:Float!
  ThreeHours:Float!
  TwoAndHalfHours:Float!
}
input educationLevelInput {
  price:EducationLevelPrice!
  name:lookUp!
  schoolTypeId:ID!
}
type ChatInfo{
  profileImage:String
  userName:String!
}
enum StateTime{
  PREVIOUS,
  UPCOMING
}
input fromToInput{
  from:DateTime!
  to:DateTime!
}
input notificationData{
  userToken:String!
  deviceToken:String!
}
input materialData {
  education_LevelId:ID!
  name:lookUp!
  tags:[ID]
  description:DLookUp!
  
}
type TeacherInfo{
  full_name:String
  email:String
  user:User
  image_URL:String
  birth_date:String
  Education_Level:[Education_Level]
  about:String
  phone_number:String
  address:String
  courseCount:Int
  averageRating:Int
  ratingCounts:Int
  userId:String
  schoolType:[SchoolType]
  longitude:String
  latitude:String
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
  student_info:student_info!
}
input student_info {
  student_name:String!
  full_number:String!
  address:String!
  longitude:Float
  latitude:Float
  
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
  homeWorkPackage:String
  studentsCount:Int!

  price:Int!
  teacherId:ID!
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
input TeacherDocumentInput{
  IDFrontImageUR:String!
  IDBackImageURL:String!
  certificateURL:String!
  CV_URL:String
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
  full_name:String
}
input teacherInfoInput{
  image_URL:String
  birth_date:DateTime
  education_levels_ID:[ID!]
  address:String
  about:String
  longitude:String
  latitude:String
}
type teacherSchedule{
  time:fromTo!
  day:String!
  state:Int!
}
type Appointment_state{
  id:ID!
  name:String!
  color:String!
  Appoitment_state_key:String!
}
type TeacherProfile{
  id:ID!
  user:User!
  description:String!
  address:String
  subjects:[CourseTag]
  courseCount:Int!
  averageRating:Int!
  ratingCounts:Int! 
  register:Int!
  workingDays:[workingDay]
}
# type workingDay{
#   id:ID!
#   day:Day 
#   hours:[WorkingHour]
#   teacherId:String!
# }
type workingDay{
  day:Day!
  hours:[fromTo]

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
  student:User!
  courseHoursType:courseHoursType!
  teacher:User!
  rejectionReason:String
  studentCount:Int
  isReview:Boolean!
  packageName:String
}

type UserReviewer{
  id:ID!
  image:String
  name:String!
}
type TeacherReview{
  student:UserReviewer!
  createdAt:DateTime!
  ratingStars:Float!
  review:String!
}
type StudentReview{
  teacher:UserReviewer!
  createdAt:DateTime!
  ratingStars:Float!
  review:String!
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
  teacherDocumentUploaded:Boolean
  teacherIsActive:Boolean
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
  accountType:RoleForSignup!
  deviceToken:String
  
}
type Materials {
  id: ID!
  name:String!
  image_URL:String
  description:String
  education_level:Education_Level!
  tags:[CourseTag]
  teacher:User
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
  type:SchoolType
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
enum RoleForSignup{
  STUDENT
  TEACHER
}
enum Role {
  STUDENT
  TEACHER
  ADMIN
}
`;

export default typeDefs