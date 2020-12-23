"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const env_1 = require("../../../src/env");
const bootstrap_1 = require("../utils/bootstrap");
describe('/api', () => {
    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------
    let settings;
    beforeAll(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return settings = yield bootstrap_1.bootstrapApp(); }));
    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------
    test('GET: / should return the api-version', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(settings.app)
            .get('/api')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.version).toBe(env_1.env.app.version);
        done();
    }));
});
//# sourceMappingURL=info.test.js.map