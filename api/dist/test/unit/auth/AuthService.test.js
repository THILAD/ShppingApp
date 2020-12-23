"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mock_express_request_1 = tslib_1.__importDefault(require("mock-express-request"));
const AuthService_1 = require("../../../src/auth/AuthService");
const LogMock_1 = require("../lib/LogMock");
const RepositoryMock_1 = require("../lib/RepositoryMock");
describe('AuthService', () => {
    let authService;
    let userRepository;
    let log;
    beforeEach(() => {
        log = new LogMock_1.LogMock();
        userRepository = new RepositoryMock_1.RepositoryMock();
        authService = new AuthService_1.AuthService(log, userRepository);
    });
    describe('parseTokenFromRequest', () => {
        test('Should return the credentials of the basic authorization header', () => {
            const base64 = Buffer.from(`bruce:1234`).toString('base64');
            const req = new mock_express_request_1.default({
                headers: {
                    Authorization: `Basic ${base64}`,
                },
            });
            const credentials = authService.parseBasicAuthFromRequest(req);
            expect(credentials.username).toBe('bruce');
            expect(credentials.password).toBe('1234');
        });
        test('Should return undefined if there is no basic authorization header', () => {
            const req = new mock_express_request_1.default({
                headers: {},
            });
            const token = authService.parseBasicAuthFromRequest(req);
            expect(token).toBeUndefined();
            expect(log.infoMock).toBeCalledWith('No credentials provided by the client', []);
        });
        test('Should return undefined if there is a invalid basic authorization header', () => {
            const req = new mock_express_request_1.default({
                headers: {
                    Authorization: 'Basic 1234',
                },
            });
            const token = authService.parseBasicAuthFromRequest(req);
            expect(token).toBeUndefined();
            expect(log.infoMock).toBeCalledWith('No credentials provided by the client', []);
        });
    });
});
//# sourceMappingURL=AuthService.test.js.map