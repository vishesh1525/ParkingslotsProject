import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const VideoSchema=new Schema({
   videoFile:{
    type:String,//cloundinary url
    required:true,
},
 thumbnail:{
    type:String,//cloundinary url
    required:true,
 },
 title:{
    type:String,//cloundinary url
    required:true,
 },
 description:{
    type:String,
    required:true
 },
 duration:{
    type:Number,
    required:true
 },
 views:{
    type:Number,
    default:0
 },
 ispublished:{
    type:Boolean,
    default:true
 },
 owner:[
    {
        type:Schema.Types.ObjectId,
        ref:"Owner"
    }
 ]

},{timestamps:true})
VideoSchema.plugin(mongooseAggregatePaginate)
export const Video=mongoose.model(
"Video",VideoSchema
)