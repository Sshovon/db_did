"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveCredentialDefinition = exports.storeCredentialDefinition = void 0;
const core_1 = require("@aries-framework/core");
const db_1 = require("./db");
const credentialDefinition_1 = require("../model/credentialDefinition");
async function storeCredentialDefinition(options) {
    try {
        await (0, db_1.connect)();
        const credDef = options.credDef;
        const credDefResourceId = core_1.utils.uuid();
        const credentialDefinitionId = `${credDef.issuerId}/resources/credential-definition/${credDefResourceId}`;
        // Create and store credDef in MongoDB
        const newCredDef = new credentialDefinition_1.DbCredentialDefinitionModel({
            credentialDefinitionId,
            issuerId: credDef.issuerId,
            schemaId: credDef.schemaId,
            tag: credDef.tag,
            value: credDef.value,
            type: 'CL'
        });
        await newCredDef.save();
        await (0, db_1.disconnect)();
        return {
            credentialDefinitionId,
            issuerId: credDef.issuerId,
            schemaId: credDef.schemaId,
            tag: credDef.tag,
            value: credDef.value,
            type: credDef.type
        };
    }
    catch (e) {
        throw new Error(e.message);
    }
}
exports.storeCredentialDefinition = storeCredentialDefinition;
async function retrieveCredentialDefinition(options) {
    try {
        await (0, db_1.connect)();
        const credDef = await credentialDefinition_1.DbCredentialDefinitionModel.findOne({ credentialDefinitionId: options.credentialDefinitionId });
        if (!credDef) {
            throw new Error('Credential Definition not found');
        }
        await (0, db_1.disconnect)();
        return {
            credentialDefinitionId: credDef.credentialDefinitionId,
            issuerId: credDef.issuerId,
            schemaId: credDef.schemaId,
            tag: credDef.tag,
            value: credDef.value,
            type: credDef.type
        };
    }
    catch (e) {
        await (0, db_1.disconnect)();
        throw new Error(e.message);
    }
}
exports.retrieveCredentialDefinition = retrieveCredentialDefinition;
