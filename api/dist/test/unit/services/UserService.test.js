"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const User_1 = require("../../../src/api/models/User");
const UserService_1 = require("../../../src/api/services/UserService");
const events_1 = require("../../../src/api/subscribers/events");
const EventDispatcherMock_1 = require("../lib/EventDispatcherMock");
const LogMock_1 = require("../lib/LogMock");
const RepositoryMock_1 = require("../lib/RepositoryMock");
describe('UserService', () => {
    test('Find should return a list of users', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const log = new LogMock_1.LogMock();
        const repo = new RepositoryMock_1.RepositoryMock();
        const ed = new EventDispatcherMock_1.EventDispatcherMock();
        const user = new User_1.User();
        user.id = '1';
        user.firstName = 'John';
        user.lastName = 'Doe';
        user.email = 'john.doe@test.com';
        repo.list = [user];
        const userService = new UserService_1.UserService(repo, ed, log);
        const list = yield userService.find();
        expect(list[0].firstName).toBe(user.firstName);
        done();
    }));
    test('Create should dispatch subscribers', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const log = new LogMock_1.LogMock();
        const repo = new RepositoryMock_1.RepositoryMock();
        const ed = new EventDispatcherMock_1.EventDispatcherMock();
        const user = new User_1.User();
        user.id = '1';
        user.firstName = 'John';
        user.lastName = 'Doe';
        user.email = 'john.doe@test.com';
        const userService = new UserService_1.UserService(repo, ed, log);
        const newUser = yield userService.create(user);
        expect(ed.dispatchMock).toBeCalledWith([events_1.events.user.created, newUser]);
        done();
    }));
});
//# sourceMappingURL=UserService.test.js.map