"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbAnonCredsRegistry = void 0;
const core_1 = require("@aries-framework/core");
class DbAnonCredsRegistry {
    getSchema(agentContext, schemaId) {
        throw new Error('Method not implemented.');
    }
    async registerSchema(agentContext, options) {
        try {
            const schema = options.schema;
            const schemaResource = {
                id: core_1.utils.uuid(),
                name: `${schema.name}-Schema`,
                resourceType: 'anonCredsSchema',
                data: {
                    name: schema.name,
                    version: schema.version,
                    attrNames: schema.attrNames,
                },
                version: schema.version,
            };
            // const response = await cheqdDidRegistrar.createResource(agentContext, schema.issuerId, schemaResource)
            // todo create and store
            // if (response.resourceState.state !== 'finished') {
            //   throw new Error(response.resourceState.reason)
            // }
            return {
                schemaState: {
                    state: 'finished',
                    schema,
                    schemaId: `${schema.issuerId}/resources/${schemaResource.id}`,
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
