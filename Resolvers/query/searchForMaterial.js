export default async (parent, { word }, { req, prisma }, info) => {
  return await prisma.materials.findMany({
    where: {
      OR: [
        {
          lookUp: {
            ar: {
              contains: word,
            },
          },
        },
        {
          lookUp: {
            eng: {
              contains: word,
            },
          },
        },
      ],
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
  });
};
