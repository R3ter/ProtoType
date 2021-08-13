import { checkToken } from "../../../methods/Tokens.js";

export default async (parent, { arText, engText, link }, { prisma, req }) => {
  await checkToken({ token: req.headers.token, Roles: ["ADMIN"] });
  return await prisma.infoTape
    .create({
      data: {
        arText,
        engText,
        link,
      },
    })
    .then(() => true)
    .catch(() => false);
};
