"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidKey = void 0;
const core_1 = require("@aries-framework/core");
const keyDidDocument_1 = require("./keyDidDocument");
class DidKey {
    key;
    constructor(key) {
        this.key = key;
    }
    static fromDid(did) {
        const parsed = (0, core_1.parseDid)(did);
        const key = core_1.Key.fromFingerprint(parsed.id);
        return new DidKey(key);
    }
    get did() {
        return `did:db:${this.key.fingerprint}`;
    }
    get didDocument() {
        return (0, keyDidDocument_1.getDidDocumentForKey)(this.did, this.key);
    }
}
exports.DidKey = DidKey;
