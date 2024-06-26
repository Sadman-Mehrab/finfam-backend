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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicUserById = exports.getCurrentUser = exports.signin = exports.signup = void 0;
const authService_1 = require("../services/authService");
const models_1 = require("../models/");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    const hashedPassword = yield (0, authService_1.hashPassword)(password);
    try {
        const userDoc = yield models_1.UserModel.create({
            userName,
            email,
            password: hashedPassword,
        });
        const _a = userDoc.toObject(), { password } = _a, user = __rest(_a, ["password"]);
        res.status(201).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    try {
        const userDoc = yield models_1.UserModel.findOne({ userName: userName });
        const user = userDoc.toObject();
        const isPasswordValid = yield (0, authService_1.comparePasswords)(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        const generatedToken = yield (0, authService_1.generateJWT)(user);
        const response = { access_token: generatedToken, userName: userName };
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "User Not Found" });
    }
});
exports.signin = signin;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const user = req.user;
    try {
        const userDoc = yield models_1.UserModel.findOne({ _id: user._id });
        const _b = userDoc.toObject(), { password } = _b, response = __rest(_b, ["password"]);
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "User Not Found" });
    }
});
exports.getCurrentUser = getCurrentUser;
const getPublicUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const userDoc = yield models_1.UserModel.findOne({ _id: userId });
        const user = userDoc.toObject();
        res.status(200).json({ userName: user.userName });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "User Not Found" });
    }
});
exports.getPublicUserById = getPublicUserById;
//# sourceMappingURL=userController.js.map