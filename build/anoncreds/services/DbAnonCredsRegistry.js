var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { calculateResourceId } from '../utils/utils';
export class DbAnonCredsRegistry {
    constructor() {
        this.methodName = 'db';
        this.supportedIdentifier = /^did:db:[_a-z0-9.%A-]*/;
    }
    getSchema(agentContext, schemaId) {
        throw new Error('Method not implemented.');
    }
    registerSchema(agentContext, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // Nothing to actually do other than generating a schema id
            const resourceId = calculateResourceId(options.schema);
            const schemaId = `${options.schema.issuerId}?service=anoncreds&relativeRef=/schema/${resourceId}`;
            return {
                schemaState: { state: 'finished', schema: options.schema, schemaId },
                registrationMetadata: {},
                schemaMetadata: {},
            };
        });
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
}
