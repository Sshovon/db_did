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
    // Nothing to actually do other than generating a schema id
    const resourceId = calculateResourceId(options.schema)

    const schemaId = `${options.schema.issuerId}?service=anoncreds&relativeRef=/schema/${resourceId}`
    return {
      schemaState: { state: 'finished', schema: options.schema, schemaId },
      registrationMetadata: {},
      schemaMetadata: {},
    }
  }u
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
