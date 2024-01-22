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
             let user=await usertype.findOne({email:req.body.email})
             
             if(!user){
                return res.status(200).json("Not Valid Email")
             }
             else{
             if(user.isVerified){
                console.log(user)
            let pass=   await bcrypt.compareSync(req.body.password,user.password)
       console.log(pass)
            if(pass){
                let finalUser=await jwt.sign({data:user},secret) 
                return res.status(200).json(finalUser)
        }else{
            return res.status(200).json("Not Valid Password")
        }
             }else{
                return res.status(200).json("User is Not verified")
             }}
  
        }


}
