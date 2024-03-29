import users from "./query/users.js";
import getMaterials from "./query/materials.js";
import getCities from "./query/getCities.js";
import getAreas from "./query/getAreas.js";
import getCourseTags from "./query/getCursesTags.js";
import getMyInfo from "./query/getMyInfo.js";
import getEducationLevels from "./query/getEducationLevels.js";
import getBestTeachers from "./query/getBestTeachers.js";
import BestMaterials from "./query/getBestMaterials.js";
import getTeacherInfo from "./query/getTeacherInfo.js";
import getTeacherReviews from "./query/getTeacherReviews.js";
import getTeacherAppointments from "./query/getTeacherAppointment.js";
import getTeacherCourses from "./query/getTeacherCourses.js";
import getTeachersOnMap from "./query/getTeachersOnMap.js";
import getUserInfo from "./query/getUserInfo.js";
import getPopularTeacher from "./query/getPopularTeacher.js";
import getClassStudents from "./query/getClassStudents.js";
import getMyBooking from "./query/getMyBooks.js";
import getMaterialInfo from "./query/getMaterialInfi.js";
import getSchoolTypes from "./query/getSchoolTypes.js";
import getMaterialTeachers from "./query/getMaterialTeachers.js";
import getHomeWorksPackges from "./query/getHomeWorkPackge.js";
import getBookingInfo from "./query/ConfirmBooking.js";
import getMyEducationLevels from "./query/teacher/getMyEducationLevels.js";
import getMaterialsForRegister from "./query/teacher/getMaterialsForRegister.js";
import getMyWorkingHours from "./query/teacher/getMyWorkingHours.js";
import getMyTeacherBooking from "./query/teacher/getTeacherApponitment.js";
import getMyTeacherInfo from "./query/teacher/getMyTeacherProfileInfo.js";
import teacherSearch from "./query/searchTeacher.js";
import getUserChatProfile from "./query/getUserChatProfile.js";
import getAppointmentsForAdmin from "./query/ADMIN/getAppointmentsForAdmin.js";
import getTeachersForAdmin from "./query/ADMIN/getTeacherApplications.js";
import getMyTeacherReviews from "./query/teacher/getMyReview.js";
import getMyStudentReviews from "./query/getMyStudentReviews.js";
import getSchoolTypesForAdmin from "./query/ADMIN/getSchoolTypes.js";
import getMyTeacherDocument from "./query/teacher/getTeacherDocument.js";
import getSubjectsForAdmin from "./query/ADMIN/getSubjectsForAdmin.js";
import getAllTeachersForAdmin from "./query/ADMIN/getAllTeachersForAdmin.js";
import getMajors from "./query/getMajors.js";
import getTeacherAppointmentsForAdmin from "./query/ADMIN/getTeacherAppointmentsForAdmin.js";
import getStudentAppointmentsForAdmin from "./query/ADMIN/getStudentAppointmentsForAdmin.js";
import getAppointmentsForAdminByDate from "./query/ADMIN/getAppointmentsForAdminByDate.js";
import getMaterialsForAdmin from "./query/ADMIN/getMaterilasForAdmin.js";
import getTeacherInfoForAdmin from "./query/ADMIN/getTeacherInfoForAdmin.js";
import getStudentInfoForAdmin from "./query/ADMIN/getStudentInfo.js";
import getStudentMaterials from "./query/ADMIN/getStudentMaterials.js";
import getTeacherPayment from "./query/ADMIN/getTeacherPayments.js";
import searchForUser from "./query/ADMIN/searchForUser.js";
import getStudentsForAdmin from "./query/ADMIN/getStudentsForAdmin.js";
import getOnHoldPayments from "./query/ADMIN/getOnHoldPayments.js";
import getInfoTape from "./query/getInfoTape.js";
import getAds from "./query/getAds.js";
import getStatistics from "./query/ADMIN/getStatistics.js";
import searchForMaterial from "./query/searchForMaterial.js";
const Query = {
  searchForMaterial,
  getStatistics,
  getAds,
  getInfoTape,
  getOnHoldPayments,
  getStudentsForAdmin,
  searchForUser,
  getTeacherPayment,
  getStudentMaterials,
  getStudentInfoForAdmin,
  getTeacherInfoForAdmin,
  getMaterialsForAdmin,
  getAppointmentsForAdminByDate,
  getStudentAppointmentsForAdmin,
  getTeacherAppointmentsForAdmin,
  getMajors,
  getSubjectsForAdmin,
  getMyTeacherDocument,
  getSchoolTypesForAdmin,
  getMyTeacherReviews,
  getMyStudentReviews,
  getTeachersForAdmin,
  getAllTeachersForAdmin,
  getAppointmentsForAdmin,
  getUserChatProfile,
  teacherSearch,
  getMyTeacherInfo,
  getMyTeacherBooking,
  getMyWorkingHours,
  getMaterialsForRegister,
  getMyEducationLevels,
  getBookingInfo,
  getHomeWorksPackges,
  getMaterialTeachers,
  getSchoolTypes,
  getMaterialInfo,
  getMyBooking,
  getClassStudents,
  getPopularTeacher,
  getTeachersOnMap,
  users,
  getMaterials,
  getCities,
  getMyInfo,
  getUserInfo,
  getAreas,
  getEducationLevels,
  getCourseTags,
  BestMaterials,
  getBestTeachers,
  getTeacherInfo,
  getTeacherReviews,
  getTeacherAppointments,
  getTeacherCourses,
};
export default Query;
