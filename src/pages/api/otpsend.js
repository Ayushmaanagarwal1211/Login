import { databaseconnect } from '../../../Database/database';
const accountSid = 'AC9356a85b5cd44b0a683df58b760b8d2a';
const authToken = '5864e7d7978f4e34992b1f8be45ed055';
const client = require('twilio')(accountSid, authToken);
const otpGenerator = require('otp-generator')

export default async function handler(req, res) {
    req.body=await JSON.parse(req.body)

    if(req.method=="POST"){
// Send SMS
let otp=otpGenerator.generate(6,{lowerCaseAlphabets:false,specialChars:false,upperCaseAlphabets:false,digits:true})

await client.messages
    .create({
                from: '+17817080395',
        to: `+91${req.body.phonenumber}`,body:`Your Otp is ${otp}`
    })
    console.log(otp)
   return res.status(200).json(otp)
       
    }


}
