import { AnonCredsRegistry, GetSchemaReturn, RegisterSchemaOptions, RegisterSchemaReturn, GetCredentialDefinitionReturn, RegisterCredentialDefinitionOptions, RegisterCredentialDefinitionReturn, GetRevocationRegistryDefinitionReturn, GetRevocationStatusListReturn } from '@aries-framework/anoncreds';
import { AgentContext, Module, DependencyManager, DidRegistrar, DidCreateResult, DidUpdateResult, DidDeactivateResult, DidCreateOptions, KeyType, Buffer, DidResolver, DidResolutionResult } from '@aries-framework/core';

declare class DbAnonCredsRegistry implements AnonCredsRegistry {
    protected db_url: string;
    constructor(db_url: string);
    getSchema(agentContext: AgentContext, schemaId: string): Promise<GetSchemaReturn>;
    registerSchema(agentContext: AgentContext, options: RegisterSchemaOptions): Promise<RegisterSchemaReturn>;
    getCredentialDefinition(agentContext: AgentContext, credentialDefinitionId: string): Promise<GetCredentialDefinitionReturn>;
    registerCredentialDefinition(agentContext: AgentContext, options: RegisterCredentialDefinitionOptions): Promise<RegisterCredentialDefinitionReturn>;
    getRevocationRegistryDefinition(agentContext: AgentContext, revocationRegistryDefinitionId: string): Promise<GetRevocationRegistryDefinitionReturn>;
    getRevocationStatusList(agentContext: AgentContext, revocationRegistryId: string, timestamp: number): Promise<GetRevocationStatusListReturn>;
    methodName: string;
    readonly supportedIdentifier: RegExp;
}

declare class DbModule implements Module {
    constructor();
    register(dependencyManager: DependencyManager): void;
    initialize(agentContext: AgentContext): Promise<void>;
}

declare class DbDidRegistrar implements DidRegistrar {
    readonly supportedMethods: string[];
    create(agentContext: AgentContext, options: KeyDidCreateOptions): Promise<DidCreateResult>;
    update(): Promise<DidUpdateResult>;
    deactivate(): Promise<DidDeactivateResult>;
}
interface KeyDidCreateOptions extends DidCreateOptions {
    method: 'db';
    did?: never;
    didDocument?: never;
    options: {
        keyType: KeyType;
    };
    secret?: {
        seed?: Buffer;
        privateKey?: Buffer;
    };
}

declare class DbDidResolver implements DidResolver {
    readonly supportedMethods: string[];
    resolve(agentContext: AgentContext, did: string): Promise<DidResolutionResult>;
}

export { DbAnonCredsRegistry, DbDidRegistrar, DbDidResolver, DbModule };
