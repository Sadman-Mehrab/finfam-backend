"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    families: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Family",
        },
    ],
    contributions: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Contribution",
        },
    ],
    goals: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Goal",
        },
    ],
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=userModel.js.map