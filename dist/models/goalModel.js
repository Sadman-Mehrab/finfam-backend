"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalModel = void 0;
const mongoose_1 = require("mongoose");
const goalSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    family: {
        type: mongoose_1.Types.ObjectId,
        ref: "Family",
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    contributions: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Contribution",
        },
    ],
    contributors: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "User",
        },
    ],
}, { timestamps: true });
exports.GoalModel = (0, mongoose_1.model)("Goal", goalSchema);
//# sourceMappingURL=goalModel.js.map