"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbAnonCredsRegistry = void 0;
const schema_1 = require("../../ledger/controller/schema");
const credentialDefintion_1 = require("../../ledger/controller/credentialDefintion");
class DbAnonCredsRegistry {
    async getSchema(agentContext, schemaId) {
        try {
            const schema = await (0, schema_1.retrieveSchema)({ schemaId });
            return {
                schema: {
                    issuerId: schema.issuerId,
                    name: schema.name,
                    version: schema.version,
                    attrNames: schema.attrNames,
                },
                schemaMetadata: {},
                schemaId: schema.schemaId,
                resolutionMetadata: {},
            };
        }
        catch (e) {
            return {
                schemaId,
                resolutionMetadata: {
                    error: e.message || 'notFound',
                },
                schemaMetadata: {},
            };
        }
    }
    async registerSchema(agentContext, options) {
        try {
            const schema = options.schema;
            const result = await (0, schema_1.storeSchema)({ schema });
            return {
                schemaState: {
                    state: 'finished',
                    schema,
                    schemaId: result.schemaId,
                },
                registrationMetadata: {},
                schemaMetadata: {},
            };
        }
        catch (error) {
            agentContext.config.logger.debug(`Error registering schema for did '${options.schema.issuerId}'`, {
                error,
                did: options.schema.issuerId,
                schema: options,
            });
            return {
                schemaMetadata: {},
                registrationMetadata: {},
                schemaState: {
                    state: 'failed',
                    schema: options.schema,
                    reason: `unknownError: ${error.message}`,
                },
            };
        }
    }
    async getCredentialDefinition(agentContext, credentialDefinitionId) {
        try {
            const credentialDefinition = await (0, credentialDefintion_1.retrieveCredentialDefinition)({ credentialDefinitionId });
            return {
                credentialDefinitionId: credentialDefinition.credentialDefinitionId,
                credentialDefinition: {
                    issuerId: credentialDefinition.issuerId,
                    schemaId: credentialDefinition.schemaId,
                    tag: credentialDefinition.tag,
                    value: credentialDefinition.value,
                    type: 'CL'
                },
                credentialDefinitionMetadata: {},
                resolutionMetadata: {},
            };
        }
        catch (e) {
            return {
                credentialDefinitionId,
                credentialDefinitionMetadata: {},
                resolutionMetadata: {
                    error: e.message || 'notFound',
                    message: `unable to resolve credential definition: ${e.message}`,
                },
            };
        }
    }
    async registerCredentialDefinition(agentContext, options) {
        try {
            const result = await (0, credentialDefintion_1.storeCredentialDefinition)({ credDef: options.credentialDefinition });
            return {
                credentialDefinitionMetadata: {},
                registrationMetadata: {},
                credentialDefinitionState: {
                    credentialDefinition: options.credentialDefinition,
                    credentialDefinitionId: result.credentialDefinitionId,
                    state: 'finished',
                },
            };
        }
        catch (e) {
            return {
                credentialDefinitionMetadata: {},
                registrationMetadata: {},
                credentialDefinitionState: {
                    credentialDefinition: options.credentialDefinition,
                    state: 'failed',
                    reason: `unknownError`,
                },
            };
        }
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
