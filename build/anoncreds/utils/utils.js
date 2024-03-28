import { TypedArrayEncoder, Hasher } from '@aries-framework/core';
import canonicalize from 'canonicalize';
export function calculateResourceId(resourceObjectValue) {
    const objectString = canonicalize(resourceObjectValue);
    if (!objectString) {
        throw new Error('Cannot canonicalize resource object');
    }
    return TypedArrayEncoder.toBase58(Hasher.hash(TypedArrayEncoder.fromString(objectString), 'sha2-256'));
}
export function verifyResourceId(resourceObjectValue, resourceId) {
    return calculateResourceId(resourceObjectValue) === resourceId;
}
