import { checkToken } from "../../../methods/Tokens.js";

export default async (parent, { data }, { prisma, req }) => {
  await checkToken({ token: req.headers.token, Roles: ["ADMIN"] });
  return await prisma.ad
    .create({
      data: {
        ...data,
      },
    })
    .then(() => true)
    .catch(() => false);
};
