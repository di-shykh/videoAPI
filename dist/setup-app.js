"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const videos_router_1 = require("./videos/routers/videos.router");
const http_statuses_1 = require("./core/types/http-statuses");
const testing_router_1 = require("./testing/routers/testing.router");
const setupApp = (app) => {
    app.use(express_1.default.json());
    app.get('/', (request, res) => {
        res.status(http_statuses_1.HttpStatus.Ok).send('Server started');
    });
    app.use('/hometask_01/api/videos', videos_router_1.videoRouter);
    app.use('/hometask_01/api/testing', testing_router_1.testingRouter);
    return app;
};
exports.setupApp = setupApp;
//# sourceMappingURL=setup-app.js.map