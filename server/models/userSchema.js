import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
     Name:{
        type:String,
        required:[true,'Name is required'],
     },
     username:{
        type:String,
        required:[true,'Username is required'],
        unique:true,
        minLength:[3,'Username must be of 3 charcters long..!!']
     },
     email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
     },
     password:{
        type:String,
        required:[true,'Password is required'],
        minLength:[7,"Password should  be 7 charcters long"]
     }
});



const User = mongoose.model('User', userSchema);

export default User;  