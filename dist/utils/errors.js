"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
// TODO
class CustomError extends Error {
    constructor(...args) {
        super(...args);
        this.statusCode = 404;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=errors.js.map