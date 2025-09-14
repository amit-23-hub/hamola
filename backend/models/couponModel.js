const mongoose = require('mongoose')

const couponSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        uppercase: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    type: {
        type: String,
        enum: ['percentage', 'fixed', 'free_shipping'],
        required: true
    },
    value: {
        type: Number,
        required: true,
        min: 0
    },
    minimumAmount: {
        type: Number,
        default: 0
    },
    maximumDiscount: {
        type: Number,
        default: null
    },
    usageLimit: {
        type: Number,
        default: null
    },
    usedCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    validFrom: {
        type: Date,
        required: true
    },
    validUntil: {
        type: Date,
        required: true
    },
    applicableTo: {
        type: String,
        enum: ['all', 'category', 'product'],
        default: 'all'
    },
    categories: [{
        type: String
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],
    userRestrictions: {
        type: String,
        enum: ['all', 'new_users', 'existing_users', 'specific_users'],
        default: 'all'
    },
    specificUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    usageHistory: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order'
        },
        discountAmount: Number,
        usedAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
})

// Validate that validUntil is after validFrom
couponSchema.pre('save', function(next) {
    if (this.validUntil <= this.validFrom) {
        return next(new Error('Valid until date must be after valid from date'))
    }
    next()
})

// Validate usage limit
couponSchema.pre('save', function(next) {
    if (this.usageLimit && this.usedCount > this.usageLimit) {
        return next(new Error('Used count cannot exceed usage limit'))
    }
    next()
})

const couponModel = mongoose.model("coupon", couponSchema)

module.exports = couponModel
