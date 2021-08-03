export default {
  async text(parent, args, { req }) {
    return req.headers.lang == "ar" ? parent.arText : parent.engText;
  },
};
