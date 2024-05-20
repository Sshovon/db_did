import type {
  AnonCredsRegistry,
  GetCredentialDefinitionReturn,
  GetRevocationStatusListReturn,
  GetRevocationRegistryDefinitionReturn,
  GetSchemaReturn,
  RegisterCredentialDefinitionOptions,
  RegisterCredentialDefinitionReturn,
  RegisterSchemaReturn,
  RegisterSchemaOptions,
} from '@aries-framework/anoncreds'
import type { AgentContext } from '@aries-framework/core'

import { AriesFrameworkError, Buffer, Hasher, JsonTransformer, TypedArrayEncoder, utils } from '@aries-framework/core'

import { DbDidRegistrar, DbDidResolver } from '../../dids/index'
import { calculateResourceId } from '../utils/utils'
import { retrieveSchema, storeSchema } from '../../db/controller/schema'
import { retrieveCredentialDefinition, storeCredentialDefinition } from '../../db/controller/credentialDefintion'

export class DbAnonCredsRegistry implements AnonCredsRegistry {
  constructor(protected db_url: string) { }
  public async getSchema(agentContext: AgentContext, schemaId: string): Promise<GetSchemaReturn> {
    try {
      const schema = await retrieveSchema({ db_url: this.db_url, schemaId })
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
      }

    } catch (e) {
      return {
        schemaId,
        resolutionMetadata: {
          error: (e as Error).message || 'notFound',
        },
        schemaMetadata: {},
      };
    }
  }

  public async registerSchema(
    agentContext: AgentContext,
    options: RegisterSchemaOptions
  ): Promise<RegisterSchemaReturn> {
    try {
      const schema = options.schema
      const result = await storeSchema({ db_url: this.db_url, schema })
      return {
        schemaState: {
          state: 'finished',
          schema,
          schemaId: result.schemaId,
        },
        registrationMetadata: {},
        schemaMetadata: {},
      }
    } catch (error) {
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
          reason: `unknownError: ${(error as Error).message}`,
        },
      }
    }
  }
  public async getCredentialDefinition(agentContext: AgentContext, credentialDefinitionId: string): Promise<GetCredentialDefinitionReturn> {
    try {
      const credentialDefinition = await retrieveCredentialDefinition({ db_url: this.db_url, credentialDefinitionId });
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
      }

    } catch (e) {
      return {
        credentialDefinitionId,
        credentialDefinitionMetadata: {},
        resolutionMetadata: {
          error: (e as Error).message || 'notFound',
          message: `unable to resolve credential definition: ${(e as Error).message}`,
        },
      };
    }
  }
  public async registerCredentialDefinition(agentContext: AgentContext, options: RegisterCredentialDefinitionOptions): Promise<RegisterCredentialDefinitionReturn> {
    try {
      const result = await storeCredentialDefinition({db_url: this.db_url,  credDef: options.credentialDefinition });
      return {
        credentialDefinitionMetadata: {},
        registrationMetadata: {},
        credentialDefinitionState: {
          credentialDefinition: options.credentialDefinition,
          credentialDefinitionId: result.credentialDefinitionId,
          state: 'finished',
        },
      };

    } catch (e) {
      return {
        credentialDefinitionMetadata: {
        },
        registrationMetadata: {},
        credentialDefinitionState: {
          credentialDefinition: options.credentialDefinition,
          state: 'failed',
          reason: `unknownError`,
        },
      };
    }
  }
  getRevocationRegistryDefinition(agentContext: AgentContext, revocationRegistryDefinitionId: string): Promise<GetRevocationRegistryDefinitionReturn> {
    throw new Error('Method not implemented.')
  }
  getRevocationStatusList(agentContext: AgentContext, revocationRegistryId: string, timestamp: number): Promise<GetRevocationStatusListReturn> {
    throw new Error('Method not implemented.')
  }
  public methodName = 'db'

  public readonly supportedIdentifier = /^did:db:[_a-z0-9.%A-]*/


}
