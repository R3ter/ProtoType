import { checkToken } from "../../methods/Tokens.js";

const getBestTeachers = async (
  parent,
  { skip = 0, take = 5, schoolType, educationLevel },
  { req, prisma },
  info,
) => {
  const { id } = checkToken({ token: req.headers.token });

  let filter = {};
  if (schoolType == "en") {
    filter = {
      educationLevel: {
        some: {
          schoolTypeId: "79820b52-2b65-4ee8-bc20-4febca81d9f6",
        },
      },
    };
  } else if (schoolType == "ar") {
    filter = {
      educationLevel: {
        some: {
          schoolTypeId: "39d68a53-745d-4cef-81af-cec3a6fe2e5c",
        },
      },
    };
  }
  if (educationLevel) {
    filter = {
      educationLevel: {
        some: {
          id: educationLevel,
        },
      },
    };
  }
  const teachers = await prisma.teacherProfile.findMany({
    skip,
    take,
    lookUp: {
      ar: "desc",
      eng: "desc",
    },
    // where:{
    //     OR:tags.map((e)=>({subjects:{some:{id:e}}}))
    //   },
    where: {
      teacherIsActive: true,
      ...filter,
    },
    include: {
      educationLevel: {
        select: {
          lookUp: true,
          type: {
            select: {
              name: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          full_name: true,
          phone_number: true,
          email: true,
          userInfo: true,
        },
      },
    },
  });
  return teachers.map(async (e) => {
    return {
      ...e,
    };
  });
};
export default getBestTeachers;
