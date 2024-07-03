import mongoose,{Schema} from "mongoose";
//mongodb adds unique ids automatically
const userSchema=new Schema({
    username:{
         type:String,
         required:true,
         unique:true,
         lowercase:true,
         trim:true,
         index:true//cheaper to the queries search

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true
    },
    fullname:{
        type:String,
        required:true,
        lowecase:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,//cloundianary url
        required:true
    },
    coverImage:{
        type:String,//cloundianary url
        
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,//foreign kry concept
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"password is required"]//message to frontend
    },
    refreshToken:{
        type:String
    }

},{timestamps:true})

export const User=mongoose.model("User",userSchema)//create the document by this name