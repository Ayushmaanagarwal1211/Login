import { databaseconnect } from '../../../Database/database';

import usertype from '../../../schema/user';
var jwt = require('jsonwebtoken');
let secret="ayushmaan$1234"
const bcrypt=require('bcrypt')
const myPlaintextPassword = 'megamindsTask//';
const saltRounds=10
export default async function handler(req, res) {
  await databaseconnect();
  
    req.body=await JSON.parse(req.body)
   
    if(req.method=="POST"){
     
      await bcrypt.hash(req.body.password, saltRounds,async function(err, hash) {
        
let user=await jwt.verify(req.body.token,secret) 
if(user){
  await usertype.findByIdAndUpdate(user.data._id,{password:hash})
  return res.status(200).json("true")
}
return res.status(200).json("")
    });
        }


}
