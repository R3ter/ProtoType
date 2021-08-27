import { checkToken } from "../../methods/Tokens.js";

const BestMaterials = async (
  parent,
  { skip = 0, take = 5, schoolType },
  { req, prisma },
  info,
) => {
  let filter = {};
  if (schoolType == "eng") {
    filter = {
      education_level: { schoolTypeId: "79820b52-2b65-4ee8-bc20-4febca81d9f6" },
    };
  } else if (schoolType == "ar") {
    filter = {
      education_level: { schoolTypeId: "39d68a53-745d-4cef-81af-cec3a6fe2e5c" },
    };
  }
  checkToken({ token: req.headers.token });
  const materials = await prisma.materials.findMany(
    {
      skip,
      take,
      where: {
        ...filter,
      },
      include: {
        lookUp: true,
        description: true,
        tags: {
          select: {
            lookUp: true,
          },
        },
        education_level: {
          select: {
            id: true,
            lookUp: true,
            type: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    },
    info,
  );
  return materials.map(async (e) => {
    return {
      ...e,
    };
  });
};
export default BestMaterials;
