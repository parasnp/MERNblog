const mongoose=require("mongoose");
const connectCloud=async()=>{
    try{
        mongoose.set('strictQuery',false);
        const conn= await mongoose.connect(process.env.CONSTR);
        console.log("data base conneted");
    }
    catch(error){
        console.log(error);

    }
}
module.exports = connectCloud;