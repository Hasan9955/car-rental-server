"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        default: null
    },
    totalCost: {
        type: Number,
        default: 0
    },
});
