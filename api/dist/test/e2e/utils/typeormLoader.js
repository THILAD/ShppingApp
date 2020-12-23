"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("../../utils/database");
exports.typeormLoader = (settings) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const connection = yield database_1.createDatabaseConnection();
    if (settings) {
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
});
//# sourceMappingURL=typeormLoader.js.map