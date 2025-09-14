const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : String,
    profilePic : String,
    role : String,
    phone : String,
    isActive : {
        type : Boolean,
        default : true
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    lastLogin : {
        type : Date,
        default : null
    },
    addresses : [{
        type : {
            type : String,
            enum : ['home', 'work', 'other'],
            default : 'home'
        },
        street : String,
        city : String,
        state : String,
        zipCode : String,
        country : String,
        isDefault : {
            type : Boolean,
            default : false
        }
    }],
    preferences : {
        newsletter : {
            type : Boolean,
            default : true
        },
        notifications : {
            type : Boolean,
            default : true
        }
    },
    stats : {
        totalOrders : {
            type : Number,
            default : 0
        },
        totalSpent : {
            type : Number,
            default : 0
        },
        lastOrderDate : Date
    }
},{
    timestamps : true
})


const userModel =  mongoose.model("user",userSchema)


module.exports = userModel