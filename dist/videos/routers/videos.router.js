"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = require("express");
const videoInputToValidation_1 = require("../validation/videoInputToValidation");
const http_statuses_1 = require("../../core/types/http-statuses");
const error_utils_1 = require("../../core/utils/error.utils");
const in_memory_db_1 = require("../../db/in-memory.db");
exports.videoRouter = (0, express_1.Router)({});
exports.videoRouter
    .get('', (req, res) => {
    res.status(http_statuses_1.HttpStatus.Ok).send(in_memory_db_1.db.videos);
})
    .get('/:id', (req, res) => {
    const idParams = req.params.id;
    if (!idParams) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send((0, error_utils_1.createErrorMessages)([{ field: 'id', message: 'Invalid ID.' }]));
        return;
    }
    const id = parseInt(idParams);
    if (id <= 0 || isNaN(id)) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send((0, error_utils_1.createErrorMessages)([{ field: 'id', message: 'Invalid ID.' }]));
        return;
    }
    const video = in_memory_db_1.db.videos.find((v) => v.id === id);
    if (!video) {
        res.status(http_statuses_1.HttpStatus.NotFound).send((0, error_utils_1.createErrorMessages)([{ field: 'id', message: 'Video not found' }]));
        return;
    }
    res.status(http_statuses_1.HttpStatus.Ok).send(video);
})
    .post('', (req, res) => {
    var _a, _b, _c, _d, _e, _f;
    const errors = (0, videoInputToValidation_1.videoInputToValidation)(req.body);
    if (errors.length > 0) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send((0, error_utils_1.createErrorMessages)(errors));
        return;
    }
    const newVideo = {
        id: in_memory_db_1.db.videos.length > 0 ? ((_b = (_a = in_memory_db_1.db.videos[in_memory_db_1.db.videos.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : 0) + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: (_c = req.body.canBeDownloaded) !== null && _c !== void 0 ? _c : false,
        minAgeRestriction: (_d = req.body.minAgeRestriction) !== null && _d !== void 0 ? _d : null,
        createdAt: (_e = req.body.createdAt) !== null && _e !== void 0 ? _e : new Date().toISOString(),
        publicationDate: (_f = req.body.publicationDate) !== null && _f !== void 0 ? _f : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        availableResolutions: req.body.availableResolutions,
    };
    in_memory_db_1.db.videos.push(newVideo);
    res.status(http_statuses_1.HttpStatus.Created).send(newVideo);
})
    .put('/:id', (req, res) => {
    const idParams = req.params.id;
    if (!idParams) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send((0, error_utils_1.createErrorMessages)([{ field: 'id', message: 'Invalid ID.' }]));
        return;
    }
    const id = parseInt(idParams);
    if (id <= 0 || isNaN(id)) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send((0, error_utils_1.createErrorMessages)([{ field: 'id', message: 'Invalid ID.' }]));
        return;
    }
    const index = in_memory_db_1.db.videos.findIndex((v) => v.id === id);
    if (index === -1) {
        res.status(http_statuses_1.HttpStatus.NotFound).send((0, error_utils_1.createErrorMessages)([{ field: 'id', message: 'Video not found' }]));
        return;
    }
    const errors = (0, videoInputToValidation_1.videoInputToValidation)(req.body);
    if (errors.length > 0) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send((0, error_utils_1.createErrorMessages)(errors));
        return;
    }
    const videoForUpdate = in_memory_db_1.db.videos[index];
    if (videoForUpdate) {
        videoForUpdate.title = req.body.title;
        videoForUpdate.author = req.body.author;
        videoForUpdate.minAgeRestriction = req.body.minAgeRestriction;
        videoForUpdate.availableResolutions = req.body.availableResolutions;
        videoForUpdate.canBeDownloaded = req.body.canBeDownloaded;
        videoForUpdate.publicationDate = req.body.publicationDate;
        res.sendStatus(http_statuses_1.HttpStatus.NoContent);
    }
})
    .delete('/:id', (req, res) => {
    const idParams = req.params.id;
    if (!idParams) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send((0, error_utils_1.createErrorMessages)([{ field: 'id', message: 'Invalid ID.' }]));
        return;
    }
    const id = parseInt(idParams);
    if (id <= 0 || isNaN(id)) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send((0, error_utils_1.createErrorMessages)([{ field: 'id', message: 'Invalid ID.' }]));
        return;
    }
    const index = in_memory_db_1.db.videos.findIndex((v) => v.id === id);
    if (index === -1) {
        res.status(http_statuses_1.HttpStatus.NotFound).send((0, error_utils_1.createErrorMessages)([{ field: 'id', message: 'Video not found' }]));
        return;
    }
    in_memory_db_1.db.videos.splice(index, 1);
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
//# sourceMappingURL=videos.router.js.map