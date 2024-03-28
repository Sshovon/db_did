"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbDidResolver = void 0;
const core_1 = require("@aries-framework/core");
class DbDidResolver {
    supportedMethods = ['db'];
    async resolve(agentContext, did) {
        const didDocumentMetadata = {};
        try {
            const didDocument = core_1.DidKey.fromDid(did).didDocument;
            return {
                didDocument,
                didDocumentMetadata,
                didResolutionMetadata: { contentType: 'application/did+ld+json' },
            };
        }
        catch (error) {
            return {
                didDocument: null,
                didDocumentMetadata,
                didResolutionMetadata: {
                    error: 'notFound',
                    message: `resolver_error: Unable to resolve did '${did}': ${error}`,
                },
            };
        }
    }
}
exports.DbDidResolver = DbDidResolver;
