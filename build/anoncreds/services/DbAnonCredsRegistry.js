"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbAnonCredsRegistry = void 0;
const utils_1 = require("../utils/utils");
class DbAnonCredsRegistry {
    getSchema(agentContext, schemaId) {
        throw new Error('Method not implemented.');
    }
    async registerSchema(agentContext, options) {
        // Nothing to actually do other than generating a schema id
        const resourceId = (0, utils_1.calculateResourceId)(options.schema);
        const schemaId = `${options.schema.issuerId}?service=anoncreds&relativeRef=/schema/${resourceId}`;
        return {
            schemaState: { state: 'finished', schema: options.schema, schemaId },
            registrationMetadata: {},
            schemaMetadata: {},
        };
    }
    getCredentialDefinition(agentContext, credentialDefinitionId) {
        throw new Error('Method not implemented.');
    }
    registerCredentialDefinition(agentContext, options) {
        throw new Error('Method not implemented.');
    }
    getRevocationRegistryDefinition(agentContext, revocationRegistryDefinitionId) {
        throw new Error('Method not implemented.');
    }
    getRevocationStatusList(agentContext, revocationRegistryId, timestamp) {
        throw new Error('Method not implemented.');
    }
    methodName = 'db';
    supportedIdentifier = /^did:db:[_a-z0-9.%A-]*/;
}
exports.DbAnonCredsRegistry = DbAnonCredsRegistry;
