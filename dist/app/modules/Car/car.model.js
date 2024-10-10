"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    isElectric: {
        type: Boolean,
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: "available"
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
// if car is deleted we will not send it to client
carSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
carSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
exports.Car = (0, mongoose_1.model)('Car', carSchema);
