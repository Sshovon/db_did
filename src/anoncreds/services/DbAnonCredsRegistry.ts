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

export class DbAnonCredsRegistry implements AnonCredsRegistry {
  getSchema(agentContext: AgentContext, schemaId: string): Promise<GetSchemaReturn> {
    throw new Error('Method not implemented.')
  }
  public async registerSchema(
    agentContext: AgentContext,
    options: RegisterSchemaOptions
  ): Promise<RegisterSchemaReturn> {
    try {

      const schema = options.schema
      const schemaResource = {
        id: utils.uuid(),
        name: `${schema.name}-Schema`,
        resourceType: 'anonCredsSchema',
        data: {
          name: schema.name,
          version: schema.version,
          attrNames: schema.attrNames,
        },
        version: schema.version,
      }

      // todo create and store

      return {
        schemaState: {
          state: 'finished',
          schema,
          schemaId: `${schema.issuerId}/resources/${schemaResource.id}`,
        },
        registrationMetadata: {},
        schemaMetadata: {},
      }
    } catch (error) {
      agentContext.config.logger.debug(`Error registering schema for did '${options.schema.issuerId}'`, {
        error,
        did: options.schema.issuerId,
        schema: options,
      })

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
  getCredentialDefinition(agentContext: AgentContext, credentialDefinitionId: string): Promise<GetCredentialDefinitionReturn> {
    throw new Error('Method not implemented.')
  }
  public async registerCredentialDefinition(agentContext: AgentContext, options: RegisterCredentialDefinitionOptions): Promise<RegisterCredentialDefinitionReturn> {
    try {
      // throw new Error('Method not implemented.')
      console.log(options)
      console.log(options.credentialDefinition.value)

      return {
        credentialDefinitionMetadata: {},
        registrationMetadata: {},
        credentialDefinitionState: {
          credentialDefinition: options.credentialDefinition,
          state: 'failed',
          reason: `unknownError`,
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
