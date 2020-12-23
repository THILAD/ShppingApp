"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const env_1 = require("../../src/env");
exports.createDatabaseConnection = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    typeorm_1.useContainer(typedi_1.Container);
    const connection = yield typeorm_1.createConnection({
        type: env_1.env.db.type,
        database: env_1.env.db.database,
        logging: env_1.env.db.logging,
        entities: env_1.env.app.dirs.entities,
        migrations: env_1.env.app.dirs.migrations,
    });
    return connection;
});
exports.synchronizeDatabase = (connection) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield connection.dropDatabase();
    return connection.synchronize(true);
});
exports.migrateDatabase = (connection) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield connection.dropDatabase();
    return connection.runMigrations();
});
exports.closeDatabase = (connection) => {
    return connection.close();
};
//# sourceMappingURL=database.js.map