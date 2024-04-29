import { utils } from "@aries-framework/core";
import { connect, disconnect } from "./db";
import { DbCredentialDefinitionModel } from "../model/credentialDefinition";
import { AnonCredsCredentialDefinition } from "@aries-framework/anoncreds";

export type ICredDef = {
    issuerId: string;
    schemaId: string;
    tag: string;
    value: any;
    credentialDefinitionId: string;
    type: string;
}

export async function storeCredentialDefinition(options: { credDef: AnonCredsCredentialDefinition }): Promise<ICredDef> {
    try {
        await connect();
        const credDef = options.credDef
        const credDefResourceId = utils.uuid()
        const credentialDefinitionId = `${credDef.issuerId}/resources/credential-definition/${credDefResourceId}`
        // Create and store credDef in MongoDB
        const newCredDef = new DbCredentialDefinitionModel({
            credentialDefinitionId,
            issuerId: credDef.issuerId,
            schemaId: credDef.schemaId,
            tag: credDef.tag,
            value: credDef.value,
            type: 'CL'
        });
        await newCredDef.save();
        await disconnect();
        return {
            credentialDefinitionId,
            issuerId: credDef.issuerId,
            schemaId: credDef.schemaId,
            tag: credDef.tag,
            value: credDef.value,
            type: credDef.type
        }

    } catch (e) {
        throw new Error((e as Error).message)
    }
}

export async function retrieveCredentialDefinition(options: { credentialDefinitionId: string }): Promise<ICredDef> {
    try {
        await connect();
        const credDef = await DbCredentialDefinitionModel.findOne({ credentialDefinitionId: options.credentialDefinitionId });
        if (!credDef) {
            throw new Error('Credential Definition not found');
        }
        await disconnect();
        return {
            credentialDefinitionId: credDef.credentialDefinitionId,
            issuerId: credDef.issuerId,
            schemaId: credDef.schemaId,
            tag: credDef.tag,
            value: credDef.value,
            type: credDef.type
        }
    } catch (e) {
        await disconnect();
        throw new Error((e as Error).message)
    }
}