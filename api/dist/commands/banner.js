"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const figlet = tslib_1.__importStar(require("figlet"));
figlet.text(process.argv[2], (error, data) => {
    if (error) {
        return process.exit(1);
    }
    console.log(chalk_1.default.blue(data));
    console.log('');
    return process.exit(0);
});
//# sourceMappingURL=banner.js.map