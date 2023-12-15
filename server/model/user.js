const mongoose= require('mongoose');
const  bcrypt=require('bcrypt');
const {isEmail}=require('validator');
const userSchema= mongoose.Schema(
  {
    name: {
      type:String,
      required: [true, "Plese enter your name"]
    },      
    email:{
        type: String,
        required: [true, "Please add the contact email"],
        unique:[true, "email address already registered"],
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, "Please add the user password"],
        minlength:[6, 'Minimum passwaord lenght is 6 characters']
    }
},
{timestamps : true}
);
/*mongo hooks : per is fired before the record is written in the user collection*/
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
  });

module.exports=mongoose.model("User",userSchema);


