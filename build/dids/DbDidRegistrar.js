"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbDidRegistrar = void 0;
const core_1 = require("@aries-framework/core");
const DidKey_1 = require("./DidKey");
class DbDidRegistrar {
    supportedMethods = ['db'];
    async create(agentContext, options) {
        const keyType = options.options.keyType;
        const seed = options.secret?.seed;
        const privateKey = options.secret?.privateKey;
        if (!keyType) {
            return {
                didDocumentMetadata: {},
                didRegistrationMetadata: {},
                didState: {
                    state: 'failed',
                    reason: 'Missing key type',
                },
            };
        }
        try {
            const key = await agentContext.wallet.createKey({
                keyType,
                seed,
                privateKey,
            });
            const didKey = new DidKey_1.DidKey(key);
            // Save the did so we know we created it and can issue with it
            const didRecord = new core_1.DidRecord({
                did: didKey.did,
                role: core_1.DidDocumentRole.Created,
            });
            const didRepository = agentContext.dependencyManager.resolve(core_1.DidRepository);
            await didRepository.save(agentContext, didRecord);
            // todo store db
            return {
                didDocumentMetadata: {},
                didRegistrationMetadata: {},
                didState: {
                    state: 'finished',
                    did: didKey.did,
                    didDocument: didKey.didDocument,
                    secret: {
                        // FIXME: the uni-registrar creates the seed in the registrar method
                        // if it doesn't exist so the seed can always be returned. Currently
                        // we can only return it if the seed was passed in by the user. Once
                        // we have a secure method for generating seeds we should use the same
                        // approach
                        seed: options.secret?.seed,
                        privateKey: options.secret?.privateKey,
                    },
                },
            };
        }
        catch (error) {
            if (error instanceof Error) {
                return {
                    didDocumentMetadata: {},
                    didRegistrationMetadata: {},
                    didState: {
                        state: 'failed',
                        reason: `unknownError: ${error.message}`,
                    },
                };
            }
            return {
                didDocumentMetadata: {},
                didRegistrationMetadata: {},
                didState: {
                    state: 'failed',
                    reason: `unknownError: ${error}`,
                },
            };
        }
    }
    async update() {
        return {
            didDocumentMetadata: {},
            didRegistrationMetadata: {},
            didState: {
                state: 'failed',
                reason: `notSupported: cannot update did:key did`,
            },
        };
    }
    async deactivate() {
        return {
            didDocumentMetadata: {},
            didRegistrationMetadata: {},
            didState: {
                state: 'failed',
                reason: `notSupported: cannot deactivate did:key did`,
            },
        };
    }
}
exports.DbDidRegistrar = DbDidRegistrar;
