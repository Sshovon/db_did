import { DbSchemaModel } from '../model/schema';
import { utils } from '@aries-framework/core';
import { AnonCredsSchema, RegisterSchemaOptions } from '@aries-framework/anoncreds';
import { connect, disconnect } from './db';


export type ISchema = {
    issuerId: string;
    name: string;
    version: string;
    attrNames: string[];
    schemaId: string;
}
export async function storeSchema(options: { schema: AnonCredsSchema }): Promise<ISchema> {
    try {
        await connect();
        const schema = options.schema
        const schemaResourceId = utils.uuid()
        const schemaId = `${schema.issuerId}/resources/schema/${schemaResourceId}`
        // Create and store schema in MongoDB
        const newSchema = new DbSchemaModel({
            schemaId,
            issuerId: schema.issuerId,
            name: schema.name,
            version: schema.version,
            attrNames: schema.attrNames,
        });
        await newSchema.save();
        await disconnect();
        return {
            schemaId,
            issuerId: schema.issuerId,
            name: schema.name,
            version: schema.version,
            attrNames: schema.attrNames,
        }

    } catch (e) {
        await disconnect();
        throw new Error((e as Error).message)
    }
}

export async function retrieveSchema(options: { schemaId: string }): Promise<ISchema> {
    try {
        await connect();
        const schema = await DbSchemaModel.findOne({ schemaId: options.schemaId });
        if (!schema) {
            throw new Error('Schema not found');
        }
        await disconnect();
        return {
            schemaId: schema.schemaId,
            issuerId: schema.issuerId,
            name: schema.name,
            version: schema.version,
            attrNames: schema.attrNames,
        }
    } catch (e) {
        await disconnect();
        throw new Error((e as Error).message)
    }
}