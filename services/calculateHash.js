const dotenv = require('dotenv')
const crypto = require('crypto')
dotenv.config();
const key = process.env.CRYPTO_KEY;

export const calculateHash = (expires, phone, otp) => {
  let now = Date.now();
  if (now > parseInt(expires)) return false;
  // Calculate new hash with the same key and the same algorithm
  let data = `${phone}.${otp}.${expires}`;
  let CalculatedHash = crypto
    .createHmac("sha256", `${key}`)
    .update(data)
    .digest("hex");

  return CalculatedHash;
};
