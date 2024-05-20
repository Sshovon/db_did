import mongoose, { Document, Model } from 'mongoose';

interface IDbSchema extends Document {
    issuerId: string;
    name: string;
    version: string;
    attrNames: string[];
    schemaId: string;
}

const DbSchema = new mongoose.Schema<IDbSchema>({
    issuerId: { type: String, required: true },
    name: { type: String, required: true },
    version: { type: String, required: true },
    attrNames: { type: [String], required: true },
    schemaId: { type: String, required: true }
});

export const DbSchemaModel: Model<IDbSchema> = mongoose.model<IDbSchema>('DbSchema', DbSchema);
