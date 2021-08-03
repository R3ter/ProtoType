export default async (parent, args, { prisma }) => {
  return await prisma.infoTape.findMany();
};
