"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributionModel = void 0;
const mongoose_1 = require("mongoose");
const contributionSchema = new mongoose_1.Schema({
    contributor: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    goal: {
        type: mongoose_1.Types.ObjectId,
        ref: "Goal",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.ContributionModel = (0, mongoose_1.model)("Contribution", contributionSchema);
//# sourceMappingURL=contributionModel.js.map