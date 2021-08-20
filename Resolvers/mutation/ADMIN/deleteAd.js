import { checkToken } from "../../../methods/Tokens.js";

export default async (parent, { id }, { prisma, req }) => {
  await checkToken({ token: req.headers.token, Roles: ["ADMIN"] });
  return await prisma.ad
    .delete({
      where: {
        id,
      },
    })
    .then(() => true)
    .catch(() => false);
};
