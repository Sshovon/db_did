"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveSchema = exports.storeSchema = void 0;
const schema_1 = require("../model/schema");
const core_1 = require("@aries-framework/core");
const db_1 = require("./db");
async function storeSchema(options) {
    try {
        await (0, db_1.connect)();
        const schema = options.schema;
        const schemaResourceId = core_1.utils.uuid();
        const schemaId = `${schema.issuerId}/resources/schema/${schemaResourceId}`;
        // Create and store schema in MongoDB
        const newSchema = new schema_1.DbSchemaModel({
            schemaId,
            issuerId: schema.issuerId,
            name: schema.name,
            version: schema.version,
            attrNames: schema.attrNames,
        });
        await newSchema.save();
        await (0, db_1.disconnect)();
        return {
            schemaId,
            issuerId: schema.issuerId,
            name: schema.name,
            version: schema.version,
            attrNames: schema.attrNames,
        };
    }
    catch (e) {
        await (0, db_1.disconnect)();
        throw new Error(e.message);
    }
}
exports.storeSchema = storeSchema;
async function retrieveSchema(options) {
    try {
        await (0, db_1.connect)();
        const schema = await schema_1.DbSchemaModel.findOne({ schemaId: options.schemaId });
        if (!schema) {
            throw new Error('Schema not found');
        }
        await (0, db_1.disconnect)();
        return {
            schemaId: schema.schemaId,
            issuerId: schema.issuerId,
            name: schema.name,
            version: schema.version,
            attrNames: schema.attrNames,
        };
    }
    catch (e) {
        await (0, db_1.disconnect)();
        throw new Error(e.message);
    }
}
exports.retrieveSchema = retrieveSchema;
