const express = require('express')
const app =express()
const sendOTP = require('./services/sendMessage')

app.get('/',(req,res)=>{
  console.log("Hello World")
  res.send("Working Fine")
})
app.post('/sendMessag',(req,res)=>{

  const phone = req.body.phone
  const perfix = req.body.perfix
const otpdata =sendOTP(perfix,phone)
console.log(otpdata)
})
app.post('verifyOtp',(req,res)=>{
  const phone = req.body.phone
  const perfix = req.body.perfix
  const otp = req.body.otp
  const hash = req.body.hash
  let [hashValue, expires] = hash0.split(".");

  // Check if expiry time has passed
  const CalculatedHash = calculateHash(expires, phone, otp);

  if (CalculatedHash !== hashValue) {
    return {
      message: "verification failed",
      status: 401,
    };
  }else{
    res.send("Otp Verified")
  }
})