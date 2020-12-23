"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RepositoryMock {
    constructor() {
        this.findMock = jest.fn();
        this.findOneMock = jest.fn();
        this.saveMock = jest.fn();
        this.deleteMock = jest.fn();
    }
    find(...args) {
        this.findMock(args);
        return Promise.resolve(this.list);
    }
    findOne(...args) {
        this.findOneMock(args);
        return Promise.resolve(this.one);
    }
    save(value, ...args) {
        this.saveMock(value, args);
        return Promise.resolve(value);
    }
    delete(value, ...args) {
        this.deleteMock(value, args);
        return Promise.resolve(value);
    }
}
exports.RepositoryMock = RepositoryMock;
//# sourceMappingURL=RepositoryMock.js.map