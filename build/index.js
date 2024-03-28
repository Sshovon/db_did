"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbDidResolver = exports.DbDidRegistrar = exports.DbModule = void 0;
require("reflect-metadata");
var DbModule_1 = require("./DbModule");
Object.defineProperty(exports, "DbModule", { enumerable: true, get: function () { return DbModule_1.DbModule; } });
var dids_1 = require("./dids");
Object.defineProperty(exports, "DbDidRegistrar", { enumerable: true, get: function () { return dids_1.DbDidRegistrar; } });
Object.defineProperty(exports, "DbDidResolver", { enumerable: true, get: function () { return dids_1.DbDidResolver; } });
