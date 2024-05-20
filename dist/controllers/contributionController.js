"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContribution = void 0;
const contributionModel_1 = require("../models/contributionModel");
const userModel_1 = require("../models/userModel");
const createContribution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.body;
    const { familyId } = req.params;
    // @ts-ignore
    const user = req.user;
    try {
        const contributionDoc = yield contributionModel_1.ContributionModel.create({
            contributor: user._id,
            family: familyId,
            amount: amount,
        });
        const contribution = contributionDoc.toObject();
        const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(user._id, {
            $addToSet: { contributions: contribution._id },
        });
        res.status(201).json(contribution);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});
exports.createContribution = createContribution;
//# sourceMappingURL=contributionController.js.map