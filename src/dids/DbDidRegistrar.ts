import type {
  AgentContext,
  DidRegistrar,
  DidCreateOptions,
  DidCreateResult,
  DidDeactivateResult,
  DidUpdateResult,
  AgentConfig,
} from '@aries-framework/core'

import {
    DidDocument,
    DidDocumentRole,
    DidRecord,
    DidRepository,
    KeyType,
    Buffer,
    isValidPrivateKey,
    utils,
    TypedArrayEncoder,
    getKeyFromVerificationMethod,
    JsonTransformer,
    VerificationMethod,
  } from '@aries-framework/core'

import { DidKey } from './DidKey'

export class DbDidRegistrar implements DidRegistrar {
    public readonly supportedMethods = ['db']

    public async create(agentContext: AgentContext, options: KeyDidCreateOptions): Promise<DidCreateResult> {

        const keyType = options.options.keyType 
        const seed = options.secret?.seed
        const privateKey = options.secret?.privateKey

        if (!keyType) {
            return {
                didDocumentMetadata: {},
                didRegistrationMetadata: {},
                didState: {
                    state: 'failed',
                    reason: 'Missing key type',
                },
            }
        }

        try {
            const key = await agentContext.wallet.createKey({
                keyType,
                seed,
                privateKey,
            })
            const didKey = new DidKey(key)

            // Save the did so we know we created it and can issue with it
            const didRecord = new DidRecord({
                did: didKey.did,
                role: DidDocumentRole.Created,
            })
            
            const didRepository = agentContext.dependencyManager.resolve(DidRepository)
            await didRepository.save(agentContext, didRecord)
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
            }
        } catch (error) {
            if(error instanceof Error){
                return {
                    didDocumentMetadata: {},
                    didRegistrationMetadata: {},
                    didState: {
                        state: 'failed',
                        reason: `unknownError: ${error.message}`,
                    },
                }
            }
            return {
                didDocumentMetadata: {},
                didRegistrationMetadata: {},
                didState: {
                    state: 'failed',
                    reason: `unknownError: ${error}`,
                },
            }
            
        }
    }

    public async update(): Promise<DidUpdateResult> {
        return {
            didDocumentMetadata: {},
            didRegistrationMetadata: {},
            didState: {
                state: 'failed',
                reason: `notSupported: cannot update did:key did`,
            },
        }
    }

    public async deactivate(): Promise<DidDeactivateResult> {
        return {
            didDocumentMetadata: {},
            didRegistrationMetadata: {},
            didState: {
                state: 'failed',
                reason: `notSupported: cannot deactivate did:key did`,
            },
        }
    }
}


export interface KeyDidCreateOptions extends DidCreateOptions {
    method: 'db'
    // For now we don't support creating a did:key with a did or did document
    did?: never
    didDocument?: never
    options: {
        keyType: KeyType
    }
    secret?: {
        seed?: Buffer
        privateKey?: Buffer
    }
}

export type KeyDidUpdateOptions = never
export type KeyDidDeactivateOptions = never

