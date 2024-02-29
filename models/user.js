const { default: mongoose, Schema } = require("mongoose");
const bycryptjs = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    fullname:{
        type : String,
        required : true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type :String,
        required:true
    }
},{timestamps:true});
// Hasing the password 
UserSchema.pre('save', async function (next){
    if(this.isModified('password')){
        this.password = await bycryptjs.hash(this.password,10);
    }
    next();
})
const User = mongoose.model('User',UserSchema)
module.exports = User