import { idText } from 'typescript';
import { databaseconnect } from '../../../Database/database';
var jwt = require('jsonwebtoken');
let secret="ayushmaan$1234"
const nodemailer=require('nodemailer')

import usertype from '../../../schema/user';
const bcrypt=require('bcrypt')
const myPlaintextPassword = 'megamindsTask//';
const saltRounds=10
export default async function handler(req, res) {
  await databaseconnect();
  
    req.body=await JSON.parse(req.body)
   
    if(req.method=="POST"){
      if(!req.body.isVerify){
        bcrypt.hash(req.body.password, saltRounds,async function(err, hash) {
            console.log(err,hash)
 let user= await usertype.create({
        email:req.body.email,
        phonenumber:req.body.phonenumber,password:hash,username:req.body.username,
        isVerified:false
    }) 

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
text:`Your Verification Link Is :- http://localhost:3000/tokenverify?token=${token}`, // plain text body
html: `<b>Your Verification Link Is :- http://localhost:3000/tokenverify?token=${token}</b>`, // html body
    }).then((success)=>{
        console.log("MESSAGE SENT")
    })
console.log(token)
    return res.status(200).json(token)
        });
    }
     else{
        console.log(req.body.token)
       let user=await  jwt.verify(req.body.token,secret)
       if(user){
    await usertype.findByIdAndUpdate(user.data._id,{isVerified:true})
return res.status(200).json("Success")      
}
     }  
    }


}
