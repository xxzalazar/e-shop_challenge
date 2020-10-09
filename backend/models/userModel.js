const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username: {type:String, required:true, 
        validate:{
            validator: async username => await User.find({username}).countDocuments()===0,
            message: () => "That username is already in use"
        }
    },
    password: {type: String, required: true},
    mail:{type:String, required: true,
        validate:{
            validator: async mail => await User.find({mail}).countDocuments()===0,
            message: () => "That email is already used"
        }
    },
    name: {type: String, required: true},
    surname: {type: String, required: true},
    DNI: {type: Number, default: null},
    province: {type: String, default: null},
    address: {type: String, default: null},
    city:{type: String, default: null},
    role: {type: String, default: "comprador"},
    loginGoogle: {type: Boolean, default: false}
    
})


const User = mongoose.model("user", userSchema)

module.exports = User