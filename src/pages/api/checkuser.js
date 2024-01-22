import { databaseconnect } from '../../../Database/database';
const nodemailer=require('nodemailer')
var jwt = require('jsonwebtoken');
let secret="ayushmaan$1234"
import usertype from '../../../schema/user';
const bcrypt=require('bcrypt')
const myPlaintextPassword = 'megamindsTask//';
const saltRounds=10
export default async function handler(req, res) {
  await databaseconnect();
  
    req.body=await JSON.parse(req.body)
   
    if(req.method=="POST"){
      if(req.body.reset){
      let user=await usertype.findOne({email:req.body.email})
      if(!user){
        return res.status(200).json("Not Valid Email")
      }

let token=await jwt.sign({
  data: user
}, secret, { expiresIn: '1h' });



const transport=await nodemailer.createTransport({
  service:'gmail',
  port: 587,
  secure:false,
  auth: {
    user: "loviagarwal55@gmail.com",
    pass: "hsqiflquplixfewi",
  },
})


await transport.sendMail({
  from: '"Lovi" <loviagarwal55@gmail.com>', // sender address
to: req.body.email, // list of receivers
subject: "Verification", // Subject line
text:`Your Verification Link Is :- http://localhost:3000/passwordreset?token=${token}&reser=true`, // plain text body
html: `<b>Your Verification Link Is :- http://localhost:3000/passwordreset?token=${token}&reset=true</b>`, // html body
}).then((success)=>{
  console.log("MESSAGE SENT")
})
return res.status(200).json("true")
}
        else{
          let user=await  jwt.verify(req.body.token,secret)
          return res.status(200).send(user.data._id)
        }
       
    }


}
