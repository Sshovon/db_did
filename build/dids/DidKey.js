import { Key, parseDid } from '@aries-framework/core';
import { getDidDocumentForKey } from './keyDidDocument';
export class DidKey {
    constructor(key) {
        this.key = key;
    }
    static fromDid(did) {
        const parsed = parseDid(did);
        const key = Key.fromFingerprint(parsed.id);
        return new DidKey(key);
    }
    get did() {
        return `did:db:${this.key.fingerprint}`;
    }
    get didDocument() {
        return getDidDocumentForKey(this.did, this.key);
    }
}
