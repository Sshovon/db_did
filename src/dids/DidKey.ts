import { Key, parseDid } from '@aries-framework/core'
import { getDidDocumentForKey } from './keyDidDocument'

export class DidKey {
    public readonly key: Key

    public constructor(key: Key) {
        this.key = key
    }

    public static fromDid(did: string) {
        const parsed = parseDid(did)

        const key = Key.fromFingerprint(parsed.id)
        return new DidKey(key)
    }

    public get did() {
        return `did:db:${this.key.fingerprint}`
    }

    public get didDocument() {
        return getDidDocumentForKey(this.did, this.key)
    }
}