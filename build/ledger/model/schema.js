"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSchemaModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DbSchema = new mongoose_1.default.Schema({
    issuerId: { type: String, required: true },
    name: { type: String, required: true },
    version: { type: String, required: true },
    attrNames: { type: [String], required: true },
    schemaId: { type: String, required: true }
});
exports.DbSchemaModel = mongoose_1.default.model('DbSchema', DbSchema);
