CREATE TYPE "Day" AS ENUM (
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
);
CREATE TYPE "courseHoursType" AS ENUM (
    'oneHour',
    'OneAndHalf',
    'TwoHours',
    'TwoAndHalf',
    'ThreeHours',
    'train'
);
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER', 'ADMIN');
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "Role" "Role" NOT NULL DEFAULT E 'STUDENT',
    "password" TEXT NOT NULL,
    "Active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);
CREATE TABLE "UserInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3),
    "address" TEXT,
    "about" TEXT,
    "image_URL" TEXT,
    "longitude" TEXT,
    "latitude" TEXT,
    "cover_URL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "education_LevelId" TEXT,
    PRIMARY KEY ("id")
);
CREATE TABLE "TeacherProfile" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherIsActive" BOOLEAN NOT NULL DEFAULT false,
    "IDFrontImageURL" TEXT NOT NULL DEFAULT E '',
    "IDBackImageURL" TEXT NOT NULL DEFAULT E '',
    "certificateURL" TEXT NOT NULL DEFAULT E '',
    "Rejected" BOOLEAN NOT NULL DEFAULT false,
    "paperComplete" BOOLEAN NOT NULL DEFAULT false,
    "CV_URL" TEXT,
    "image_URL" TEXT DEFAULT E '',
    PRIMARY KEY ("id")
);
CREATE TABLE "Student_Appointment_info" (
    "id" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "full_number" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "address" TEXT NOT NULL,
    PRIMARY KEY ("id")
);
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "adminAccepted" BOOLEAN NOT NULL DEFAULT false,
    "date" TEXT NOT NULL,
    "courseHoursType" "courseHoursType" NOT NULL,
    "coursePrice" DOUBLE PRECISION NOT NULL,
    "note" TEXT NOT NULL,
    "rejectionReason" TEXT,
    "teacherId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "discountPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "studentCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userInfoId" TEXT,
    "teacherProfileId" TEXT,
    "materialsId" TEXT NOT NULL,
    "homeWorkPackageId" TEXT,
    "stateKey" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "student_Appointment_infoId" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("id")
);
CREATE TABLE "HomeWorkPackage" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "MaterialId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    PRIMARY KEY ("id")
);
CREATE TABLE "Appointment_state" (
    "id" TEXT NOT NULL,
    "Appoitment_state_key" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "lookUpId" TEXT NOT NULL,
    PRIMARY KEY ("id")
);
CREATE TABLE "TeacherApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    PRIMARY KEY ("id")
);
CREATE TABLE "workingDay" (
    "id" TEXT NOT NULL,
    "day" "Day" NOT NULL,
    "teacherIdAndDay" JSONB NOT NULL,
    "hours" JSONB [],
    "teacherId" TEXT NOT NULL,
    PRIMARY KEY ("id")
);
CREATE TABLE "CourseTag" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "userInfoId" TEXT,
    "teacherProfileId" TEXT,
    "materialsId" TEXT,
    "lookUpId" TEXT NOT NULL,
    PRIMARY KEY ("id")
);
CREATE TABLE "TeacherReview" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "ratingStars" DOUBLE PRECISION NOT NULL,
    "review" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" TEXT NOT NULL,
    "appoitmentId" TEXT NOT NULL,
    PRIMARY KEY ("id")
);
CREATE TABLE "Materials" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "education_LevelId" TEXT NOT NULL,
    "image_URL" TEXT,
    "cover_URL" TEXT,
    "userInfoId" TEXT,
    "dLookUpId" TEXT NOT NULL,
    "lookUpId" TEXT NOT NULL,
    "teacherProfileId" TEXT,
    PRIMARY KEY ("id")
);
CREATE TABLE "LookUp" (
    "id" TEXT NOT NULL,
    "eng" TEXT NOT NULL,
    "ar" TEXT NOT NULL,
    "fr" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
CREATE TABLE "DLookUp" (
    "id" TEXT NOT NULL,
    "ar" TEXT,
    "eng" TEXT NOT NULL,
    "fr" TEXT,
    PRIMARY KEY ("id")
);
CREATE TABLE "Education_Level" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "oneHour" DOUBLE PRECISION NOT NULL,
    "OneAndHalf" DOUBLE PRECISION NOT NULL,
    "TwoHours" DOUBLE PRECISION NOT NULL,
    "TwoAndHalfHours" DOUBLE PRECISION NOT NULL,
    "ThreeHours" DOUBLE PRECISION NOT NULL,
    "lookUpId" TEXT NOT NULL,
    "schoolTypeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
CREATE TABLE "SchoolType" (
    "id" TEXT NOT NULL,
    "lookUpId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
CREATE TABLE "_MaterialsToUser" ("A" TEXT NOT NULL, "B" TEXT NOT NULL);
CREATE TABLE "_Education_LevelToTeacherProfile" ("A" TEXT NOT NULL, "B" TEXT NOT NULL);
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
CREATE UNIQUE INDEX "User.phone_number_unique" ON "User"("phone_number");
CREATE UNIQUE INDEX "UserInfo.userId_unique" ON "UserInfo"("userId");
CREATE UNIQUE INDEX "TeacherProfile.teacherId_unique" ON "TeacherProfile"("teacherId");
CREATE UNIQUE INDEX "Appointment_state.Appoitment_state_key_unique" ON "Appointment_state"("Appoitment_state_key");
CREATE UNIQUE INDEX "TeacherApplication.userId_unique" ON "TeacherApplication"("userId");
CREATE UNIQUE INDEX "workingDay.teacherIdAndDay_unique" ON "workingDay"("teacherIdAndDay");
CREATE UNIQUE INDEX "TeacherReview.appoitmentId_unique" ON "TeacherReview"("appoitmentId");
CREATE UNIQUE INDEX "_MaterialsToUser_AB_unique" ON "_MaterialsToUser"("A", "B");
CREATE INDEX "_MaterialsToUser_B_index" ON "_MaterialsToUser"("B");
CREATE UNIQUE INDEX "_Education_LevelToTeacherProfile_AB_unique" ON "_Education_LevelToTeacherProfile"("A", "B");
CREATE INDEX "_Education_LevelToTeacherProfile_B_index" ON "_Education_LevelToTeacherProfile"("B");
ALTER TABLE "UserInfo"
ADD FOREIGN KEY ("education_LevelId") REFERENCES "Education_Level"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
ALTER TABLE "UserInfo"
ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TeacherProfile"
ADD FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Appointment"
ADD FOREIGN KEY ("homeWorkPackageId") REFERENCES "HomeWorkPackage"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
ALTER TABLE "Appointment"
ADD FOREIGN KEY ("materialsId") REFERENCES "Materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Appointment"
ADD FOREIGN KEY ("stateKey") REFERENCES "Appointment_state"("Appoitment_state_key") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Appointment"
ADD FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Appointment"
ADD FOREIGN KEY ("student_Appointment_infoId") REFERENCES "Student_Appointment_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Appointment"
ADD FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Appointment"
ADD FOREIGN KEY ("teacherProfileId") REFERENCES "TeacherProfile"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
ALTER TABLE "Appointment"
ADD FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
ALTER TABLE "HomeWorkPackage"
ADD FOREIGN KEY ("MaterialId") REFERENCES "Materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Appointment_state"
ADD FOREIGN KEY ("lookUpId") REFERENCES "LookUp"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TeacherApplication"
ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "workingDay"
ADD FOREIGN KEY ("teacherId") REFERENCES "TeacherProfile"("teacherId") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CourseTag"
ADD FOREIGN KEY ("lookUpId") REFERENCES "LookUp"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CourseTag"
ADD FOREIGN KEY ("materialsId") REFERENCES "Materials"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
ALTER TABLE "CourseTag"
ADD FOREIGN KEY ("teacherProfileId") REFERENCES "TeacherProfile"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
ALTER TABLE "CourseTag"
ADD FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
ALTER TABLE "TeacherReview"
ADD FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "TeacherReview"
ADD FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "TeacherReview"
ADD FOREIGN KEY ("appoitmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Materials"
ADD FOREIGN KEY ("dLookUpId") REFERENCES "DLookUp"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Materials"
ADD FOREIGN KEY ("education_LevelId") REFERENCES "Education_Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Materials"
ADD FOREIGN KEY ("lookUpId") REFERENCES "LookUp"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Materials"
ADD FOREIGN KEY ("teacherProfileId") REFERENCES "TeacherProfile"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Materials"
ADD FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Education_Level"
ADD FOREIGN KEY ("lookUpId") REFERENCES "LookUp"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Education_Level"
ADD FOREIGN KEY ("schoolTypeId") REFERENCES "SchoolType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "SchoolType"
ADD FOREIGN KEY ("lookUpId") REFERENCES "LookUp"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "_MaterialsToUser"
ADD FOREIGN KEY ("A") REFERENCES "Materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "_MaterialsToUser"
ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "_Education_LevelToTeacherProfile"
ADD FOREIGN KEY ("A") REFERENCES "Education_Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "_Education_LevelToTeacherProfile"
ADD FOREIGN KEY ("B") REFERENCES "TeacherProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;