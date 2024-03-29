import { checkToken } from "../../../methods/Tokens.js";
import moment from "moment";
const { now } = moment;
const getAppointmentsForAdmin = async (
  parent,
  { skip = 0, take = 10, state = "UPCOMING" },
  { prisma, req },
) => {
  checkToken({ token: req.headers.token, Roles: ["ADMIN"] });
  let filter;
  if (state == "PREVIOUS") {
    filter = {
      adminAccepted: false,
      OR: [
        {
          dateTime: {
            lte: moment(now()).format("YYYY-MM-DD[T]HH:mm:ss[Z]"),
          },
        },
        {
          stateKey: "rejected",
        },
      ],
    };
  } else if (state == "UPCOMING") {
    filter = {
      AND: [
        {
          adminAccepted: false,
        },
        {
          dateTime: {
            gte: moment(now()).format("YYYY-MM-DD[T]HH:mm:ss[Z]"),
          },
        },
        {
          NOT: {
            stateKey: {
              equals: "rejected",
            },
          },
        },
      ],
    };
  }
  return await prisma.appointment.findMany({
    skip,
    take,
    where: {
      ...filter,
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
  });
};
export default getAppointmentsForAdmin;
