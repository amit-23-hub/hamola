const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName : String,
    brandName : String,
    category : String,
    subCategory : String, // e.g., "Dining Chairs", "Coffee Tables"
    roomType : String, // e.g., "Living Room", "Bedroom", "Dining Room"
    productImage : [],
    description : String,
    price : Number,
    sellingPrice : Number,
    dimensions : {
        length : Number,
        width : Number,
        height : Number,
        unit : { type: String, default: "inches" }
    },
    material : String, // e.g., "Wood", "Metal", "Fabric", "Leather"
    color : String,
    weight : Number,
    assemblyRequired : { type: Boolean, default: false },
    warranty : String,
    inStock : { type: Boolean, default: true },
    stockQuantity : { type: Number, default: 0 },
    rating : { type: Number, default: 0 },
    reviewCount : { type: Number, default: 0 },
    tags : [String], // e.g., ["Modern", "Minimalist", "Eco-friendly"]
    features : [String], // e.g., ["Adjustable Height", "Storage Compartment"]
    careInstructions : String
},{
    timestamps : true
})


const productModel = mongoose.model("product",productSchema)

module.exports = productModel