import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    firstName:{
        type:"String",
        required:true,
        min:2,
        max:50
    },
    lastName:{
        type:"String",
        required:true,
        min:2,
        max:50
    },
    email:{
        type:"String",
        require:true,
        max:50,
        unique: true
    },
    dob:{
        type:"String",
        max:new Date()
    },
    password:{
        type:"String",
        required:true,
        min:8
    }
},
    {timestamps: true}
)

const User=mongoose.model("User", UserSchema);
export default User;
