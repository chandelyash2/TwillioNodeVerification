const dotenv = require('dotenv')
const crypto = require('crypto')

dotenv.config();

const key = process.env.CRYPTO_KEY;
const accountSid = process.env.ACCOUNTSID;

const authToken = process.env.AUTHTOKEN;

const notifySid = process.env.NOTIFYSID;
const client = require("twilio")(accountSid, authToken);
let formattedData = [];

export const sendOTP = (perfix, phone) => {
  let otp = Math.floor(1000 + Math.random() * 9000);
  const ttl = 5 * 60 * 1000; //5 Minutes in miliseconds
  const expires = Date.now() + ttl; //timestamp to 5 minutes in the future
  let data0 = `${phone}.${otp}.${expires}`; // phone.otp.expiry_timestamp
  const hash = crypto.createHmac("sha256", `${key}`).update(data0).digest("hex"); // creating SHA256 hash of the data
  const fullHash = `${hash}.${expires}`; // Hash.expires, format to send to the user
  // localStorage.setItem("otp", otp);

  let data = [{ binding_type: "sms", address: `${perfix}${phone}` }];
  data.forEach(function (value) {
    formattedData.push(JSON.stringify(value));
  });

  const notificationOpts = {
    toBinding: formattedData,
    body: ` This is test ${otp}.`,
  };

  client.notify
    .services(`${notifySid}`)
    .notifications.create(notificationOpts)
    .then((binding) => console.log(binding.sid))
    .catch((error) => console.log(error))
    .done();

  formattedData = [];
  return fullHash;
};
