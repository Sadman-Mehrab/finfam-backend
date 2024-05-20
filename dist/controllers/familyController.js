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
exports.getUserFamilies = exports.createFamily = void 0;
const familyModel_1 = require("../models/familyModel");
const userModel_1 = require("../models/userModel");
const createFamily = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    // @ts-ignore
    const user = req.user;
    try {
        const familyDoc = yield familyModel_1.FamilyModel.create({ name: name });
        const family = familyDoc.toObject();
        const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(user._id, {
            $addToSet: { families: family._id },
        });
        const response = yield familyModel_1.FamilyModel.findByIdAndUpdate(family._id, { $addToSet: { members: user._id } }, { new: true });
        res.status(201).json(response);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});
exports.createFamily = createFamily;
const getUserFamilies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const user = req.user;
    try {
        const familyDoc = yield familyModel_1.FamilyModel.find({ members: user._id });
        res.status(201).json(familyDoc);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});
exports.getUserFamilies = getUserFamilies;
//# sourceMappingURL=familyController.js.map