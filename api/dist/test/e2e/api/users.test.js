"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nock = tslib_1.__importStar(require("nock"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const typeorm_seeding_1 = require("typeorm-seeding");
const CreateBruce_1 = require("../../../src/database/seeds/CreateBruce");
const database_1 = require("../../utils/database");
const server_1 = require("../utils/server");
describe('/api/users', () => {
    let bruce;
    let bruceAuthorization;
    let settings;
    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------
    beforeAll(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        settings = yield server_1.prepareServer({ migrate: true });
        bruce = yield typeorm_seeding_1.runSeed(CreateBruce_1.CreateBruce);
        bruceAuthorization = Buffer.from(`${bruce.username}:1234`).toString('base64');
    }));
    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------
    afterAll(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        nock.cleanAll();
        yield database_1.closeDatabase(settings.connection);
    }));
    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------
    test('GET: / should return a list of users', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(settings.app)
            .get('/api/users')
            .set('Authorization', `Basic ${bruceAuthorization}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.length).toBe(1);
        done();
    }));
    test('GET: /:id should return bruce', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(settings.app)
            .get(`/api/users/${bruce.id}`)
            .set('Authorization', `Basic ${bruceAuthorization}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.id).toBe(bruce.id);
        expect(response.body.firstName).toBe(bruce.firstName);
        expect(response.body.lastName).toBe(bruce.lastName);
        expect(response.body.email).toBe(bruce.email);
        done();
    }));
});
//# sourceMappingURL=users.test.js.map