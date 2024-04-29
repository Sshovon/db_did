"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbCredentialDefinitionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CredentialDefinitionSchema = new mongoose_1.default.Schema({
    issuerId: { type: String, required: true },
    schemaId: { type: String, required: true },
    credentialDefinitionId: { type: String, required: true },
    value: { type: Object, required: true },
    tag: { type: String, required: true },
    type: { type: String, required: true }
});
exports.DbCredentialDefinitionModel = mongoose_1.default.model('DbCredentialDefinition', CredentialDefinitionSchema);
