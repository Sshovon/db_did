import { TypedArrayEncoder, Hasher } from '@aries-framework/core'
import canonicalize from 'canonicalize'

export function calculateResourceId(resourceObjectValue: unknown) {
  const objectString = canonicalize(resourceObjectValue)

  if (!objectString) {
    throw new Error('Cannot canonicalize resource object')
  }

  return TypedArrayEncoder.toBase58(Hasher.hash(TypedArrayEncoder.fromString(objectString), 'sha2-256'))
}

export function verifyResourceId(resourceObjectValue: unknown, resourceId: string) {
  return calculateResourceId(resourceObjectValue) === resourceId
}

export function getDidDbSchemaId(unqualifiedDid: string, name: string, version: string) {
  return `did:db:${unqualifiedDid}/anoncreds/v0/SCHEMA/${name}/${version}`
}

export function parseDidDb(did: string) {
  const [didPrefix, didMethod, namespaceIdentifier] = did.split(':')
 
  return {  namespaceIdentifier, didMethod }

}