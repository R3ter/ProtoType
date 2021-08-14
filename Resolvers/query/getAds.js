const Areas = (parent, _, { req, prisma }, info) => {
  return prisma.ad.findMany();
};
export default Areas;
