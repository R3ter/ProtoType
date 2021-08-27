import { checkToken } from "../../../methods/Tokens.js";
export default async (parent, args, { prisma, req }) => {
  checkToken({ token: req.headers.token, Roles: ["ADMIN"] });

  const apointment = await prisma.appointment.aggregate({
    sum: { coursePrice: true },
    count: { _all: true },
  });

  const students = await prisma.user.count({ where: { Role: "STUDENT" } });

  const teachers = await prisma.user.count({ where: { Role: "TEACHER" } });

  const paments = await prisma.appointment.count({
    where: {
      payment: {
        is: null,
      },
    },
  });
  const unpaid = await prisma.appointment.count({
    where: {
      payment: {
        isNot: null,
      },
    },
  });
  console.log({
    teachersCount: teachers,
    studentsCount: students,
    unpaidCount: unpaid,
    paymentCount: paments,
    totalPaments: apointment.sum,
    allPaments: apointment.count,
  });
  return {
    teachersCount: teachers,
    studentsCount: students,
    unpaidCount: unpaid,
    paymentCount: paments,
    totalPaments: apointment.sum.coursePrice,
    allPaments: apointment.count._all,
  };
};
