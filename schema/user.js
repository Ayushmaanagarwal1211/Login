const { default: mongoose } = require("mongoose");

//if advocate or judge will adding the client
const schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required : true
    },
    password:{
        type:String,
        required : true
    },

    email:{
        type:String,
        required:true
    },

   isVerified:{
        type:Boolean,
        required:true
    },
    token:{
        type:String,
        required:false
    }
    
})
mongoose.models={}

const usertype=mongoose.model.appointement ||  mongoose.model('useraccount',schema);
export default usertype;