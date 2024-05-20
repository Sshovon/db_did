import mongoose, {Document, Model} from "mongoose";

interface IDbCredentialDefinition extends Document {
    issuerId: string;
    schemaId: string;
    credentialDefinitionId: string;   
    value: any;
    tag: string;
    type: string;
}


const CredentialDefinitionSchema = new mongoose.Schema<IDbCredentialDefinition>({
    issuerId: {type: String, required: true},
    schemaId: {type: String, required: true},
    credentialDefinitionId: {type: String, required: true},
    value: {type: Object, required: true},
    tag: {type: String, required: true},
    type: {type: String, required: true}
});

export const DbCredentialDefinitionModel: Model<IDbCredentialDefinition> = mongoose.model<IDbCredentialDefinition>('DbCredentialDefinition', CredentialDefinitionSchema);