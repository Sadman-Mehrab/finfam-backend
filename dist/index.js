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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const routes_1 = require("./routes");
// setup
const app = (0, express_1.default)();
app.disable("etag");
// middleware
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
});
app.use("/api/users/", routes_1.userRouter);
app.use("/api/families/", routes_1.familyRouter);
app.use("/api/goals/", routes_1.goalRouter);
app.use("/api/contributions/", routes_1.contributionRouter);
// server startup
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.config.MONGO_URI);
            app.listen(config_1.config.PORT, () => {
                console.log(`Server Started on PORT: ${config_1.config.PORT}`);
            });
        }
        catch (error) {
            console.log("Database Connection Error:" + error);
        }
    });
}
startServer();
//# sourceMappingURL=index.js.map