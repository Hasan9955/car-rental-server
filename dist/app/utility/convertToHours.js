"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToHours = void 0;
const convertToHours = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalHours = hours + minutes / 60;
    return totalHours;
};
exports.convertToHours = convertToHours;
