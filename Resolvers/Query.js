import users from './query/users.js'
import getMaterials from './query/materials.js'
import getCities from './query/getCities.js'
import getAreas from './query/getAreas.js'
import getCourseTags from './query/getCursesTags.js'
import getMyInfo from './query/getMyInfo.js'
import getEducationLevels from './query/getEducationLevels.js'
import getBestTeachers from './query/getBestTeachers.js'
import BestMaterials from './query/getBestMaterials.js'
import getTeacherInfo from './query/getTeacherInfo.js'
import getTeacherReviews from './query/getTeacherReviews.js'
import getTeacherAppointments from './query/getTeacherAppointment.js'
import getTeacherCourses from './query/getTeacherCourses.js'
import getTeachersOnMap from './query/getTeachersOnMap.js'
import getUserInfo from './query/getUserInfo.js'
import getPopularTeacher from './query/getPopularTeacher.js'
import getClassStudents from './query/getClassStudents.js'
import getMyBooking from './query/getMyBooks.js'
import getMaterialInfo from './query/getMaterialInfi.js'
const Query={
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
    getTeacherCourses
}
export default Query  
