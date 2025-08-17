const mongoose = require("mongoose");
const CoustumerSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    email :{
        type : String,
        required :true,
        unique : true
    },
    password:{
        type : String
    }
})
const EndUser = mongoose.model("EndUser" ,CoustumerSchema);
module.exports = EndUser;