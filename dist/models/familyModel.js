"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyModel = void 0;
const mongoose_1 = require("mongoose");
const familySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    members: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "User",
        },
    ],
    goals: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Goal",
        },
    ],
}, { timestamps: true });
exports.FamilyModel = (0, mongoose_1.model)("Family", familySchema);
//# sourceMappingURL=familyModel.js.map