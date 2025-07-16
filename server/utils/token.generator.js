import crypto from "crypto";

export const genRandomVerifyEmailToken = (digit = 8) => {
  try {
    const min = 10 ** (digit - 1);
    const max = 10 ** digit;
    return crypto.randomInt(min, max).toString();
  } catch (err) {
    return null;
  }
};
