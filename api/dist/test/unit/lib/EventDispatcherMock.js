"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventDispatcherMock {
    constructor() {
        this.dispatchMock = jest.fn();
    }
    dispatch(...args) {
        this.dispatchMock(args);
    }
}
exports.EventDispatcherMock = EventDispatcherMock;
//# sourceMappingURL=EventDispatcherMock.js.map