var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DidDocumentRole, DidRecord, DidRepository, } from '@aries-framework/core';
import { DidKey } from './DidKey';
export class DbDidRegistrar {
    constructor() {
        this.supportedMethods = ['db'];
    }
    create(agentContext, options) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const keyType = options.options.keyType;
            const seed = (_a = options.secret) === null || _a === void 0 ? void 0 : _a.seed;
            const privateKey = (_b = options.secret) === null || _b === void 0 ? void 0 : _b.privateKey;
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
                const key = yield agentContext.wallet.createKey({
                    keyType,
                    seed,
                    privateKey,
                });
                const didKey = new DidKey(key);
                // Save the did so we know we created it and can issue with it
                const didRecord = new DidRecord({
                    did: didKey.did,
                    role: DidDocumentRole.Created,
                });
                // todo 
                // agentContext.dependencyManager.registerInstance<AgentConfig>("AgentConfig", agentContext.config)
                const didRepository = agentContext.dependencyManager.resolve(DidRepository);
                yield didRepository.save(agentContext, didRecord);
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
                            seed: (_c = options.secret) === null || _c === void 0 ? void 0 : _c.seed,
                            privateKey: (_d = options.secret) === null || _d === void 0 ? void 0 : _d.privateKey,
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
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                didDocumentMetadata: {},
                didRegistrationMetadata: {},
                didState: {
                    state: 'failed',
                    reason: `notSupported: cannot update did:key did`,
                },
            };
        });
    }
    deactivate() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                didDocumentMetadata: {},
                didRegistrationMetadata: {},
                didState: {
                    state: 'failed',
                    reason: `notSupported: cannot deactivate did:key did`,
                },
            };
        });
    }
}
