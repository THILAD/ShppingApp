"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mock_express_response_1 = tslib_1.__importDefault(require("mock-express-response"));
const routing_controllers_1 = require("routing-controllers");
const ErrorHandlerMiddleware_1 = require("../../../src/api/middlewares/ErrorHandlerMiddleware");
const LogMock_1 = require("../lib/LogMock");
describe('ErrorHandlerMiddleware', () => {
    let log;
    let middleware;
    let err;
    let res;
    beforeEach(() => {
        log = new LogMock_1.LogMock();
        middleware = new ErrorHandlerMiddleware_1.ErrorHandlerMiddleware(log);
        res = new mock_express_response_1.default();
        err = new routing_controllers_1.HttpError(400, 'Test Error');
    });
    test('Should not print stack out in production', () => {
        middleware.isProduction = true;
        middleware.error(err, undefined, res, undefined);
        const json = res._getJSON();
        expect(json.name).toBe(err.name);
        expect(json.message).toBe(err.message);
        expect(log.errorMock).toHaveBeenCalledWith(err.name, [err.message]);
    });
    test('Should print stack out in development', () => {
        middleware.isProduction = false;
        middleware.error(err, undefined, res, undefined);
        const json = res._getJSON();
        expect(json.name).toBe(err.name);
        expect(json.message).toBe(err.message);
        expect(log.errorMock).toHaveBeenCalled();
    });
});
//# sourceMappingURL=ErrorHandlerMiddleware.test.js.map