"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
exports.configureLogger = () => {
    winston_1.configure({
        transports: [
            new winston_1.transports.Console({
                level: 'none',
                handleExceptions: false,
            }),
        ],
    });
};
//# sourceMappingURL=logger.js.map