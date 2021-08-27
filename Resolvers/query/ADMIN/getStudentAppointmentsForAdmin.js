import { checkToken } from "../../../methods/Tokens.js";
const getAppointmentsForAdmin = async (
  parent,
  { skip = 0, take = 10, studentId },
  { prisma, req },
) => {
  checkToken({ token: req.headers.token, Roles: ["ADMIN"] });

  console.log(studentId);
  return await prisma.appointment
    .findMany({
      skip,
      take,
      where: {
        studentId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        review: true,
        teacher: {
          select: {
            phone_number: true,
            email: true,
            id: true,
            full_name: true,
            teacherProfile: true,
            userInfo: true,
          },
        },
        payment: true,
        student_info: true,
        student: {
          select: {
            phone_number: true,
            email: true,
            id: true,
            full_name: true,
            userInfo: true,
          },
        },
        course: {
          select: {
            id: true,
            lookUp: true,
            description: true,
            education_level: {
              select: {
                lookUp: true,
                type: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
                id: true,
              },
            },
          },
        },
        state: {
          select: {
            name: true,
            color: true,
            id: true,
            Appoitment_state_key: true,
          },
        },
      },
    })
    .then((e) => {
      return {
        appointments: e,
      };
    });
};
export default getAppointmentsForAdmin;
