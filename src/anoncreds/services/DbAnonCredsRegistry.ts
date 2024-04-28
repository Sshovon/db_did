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
  registerCredentialDefinition(agentContext: AgentContext, options: RegisterCredentialDefinitionOptions): Promise<RegisterCredentialDefinitionReturn> {
    throw new Error('Method not implemented.')
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
