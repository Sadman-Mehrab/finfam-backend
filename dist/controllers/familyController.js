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
exports.addMemberToFamily = exports.getFamily = exports.getUserFamilies = exports.createFamily = void 0;
const mongoose_1 = require("mongoose");
const familyModel_1 = require("../models/familyModel");
const userModel_1 = require("../models/userModel");
const createFamily = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const user = req.user;
    const { name } = req.body;
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
        const familyDoc = yield familyModel_1.FamilyModel.create([{ name: name }], { session });
        const family = familyDoc[0].toObject();
        const response = yield familyModel_1.FamilyModel.findByIdAndUpdate(family._id, { $addToSet: { members: user._id } }, { new: true, session });
        const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(user._id, {
            $addToSet: { families: family._id },
        }, { session });
        yield session.commitTransaction();
        res.status(201).json(response);
    }
    catch (error) {
        yield session.abortTransaction();
        console.error(error);
        res.status(400).json({ message: error.message });
    }
    finally {
        session.endSession();
    }
});
exports.createFamily = createFamily;
const getUserFamilies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const user = req.user;
    try {
        const familyDoc = yield familyModel_1.FamilyModel.find({ members: user._id }).populate("members", "userName");
        res.status(200).json(familyDoc);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});
exports.getUserFamilies = getUserFamilies;
const getFamily = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const familyId = req.params.familyId;
    try {
        const familyDoc = yield familyModel_1.FamilyModel.findOne({ _id: familyId }).populate("members", "userName");
        res.status(200).json(familyDoc);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
});
exports.getFamily = getFamily;
const addMemberToFamily = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const familyId = req.params.familyId;
    const { memberUserName } = req.body;
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
        const memberUser = yield userModel_1.UserModel.findOne({ userName: memberUserName });
        const response = yield familyModel_1.FamilyModel.findByIdAndUpdate(familyId, { $addToSet: { members: memberUser._id } }, { new: true, session });
        const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(memberUser._id, {
            $addToSet: { families: familyId },
        }, { session });
        yield session.commitTransaction();
        res.status(200).json(response);
    }
    catch (error) {
        yield session.abortTransaction();
        console.error(error);
        res.status(400).json({ message: error.message });
    }
    finally {
        session.endSession();
    }
});
exports.addMemberToFamily = addMemberToFamily;
//# sourceMappingURL=familyController.js.map