"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const User_1 = require("../../../src/api/models/User");
describe('UserValidations', () => {
    test('User should always have a first name', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.User();
        const errorsOne = yield class_validator_1.validate(user);
        user.firstName = 'TestName';
        const errorsTwo = yield class_validator_1.validate(user);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    }));
    test('User should always have a last name', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.User();
        const errorsOne = yield class_validator_1.validate(user);
        user.lastName = 'TestName';
        const errorsTwo = yield class_validator_1.validate(user);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    }));
    test('User should always have a email', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.User();
        const errorsOne = yield class_validator_1.validate(user);
        user.email = 'test@test.com';
        const errorsTwo = yield class_validator_1.validate(user);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    }));
    test('User validation should succeed with all required fields', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.User();
        user.firstName = 'TestName';
        user.lastName = 'TestName';
        user.email = 'test@test.com';
        user.username = 'test';
        user.password = '1234';
        const errors = yield class_validator_1.validate(user);
        expect(errors.length).toEqual(0);
        done();
    }));
});
//# sourceMappingURL=UserValidations.test.js.map