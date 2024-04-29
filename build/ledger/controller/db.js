"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async (databaseUrl) => {
    try {
        await mongoose_1.default.connect(databaseUrl ?? 'mongodb://localhost:27017/ledger');
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};
exports.connect = connect;
const disconnect = async () => {
    try {
        await mongoose_1.default.disconnect();
        console.log('Disconnected from MongoDB');
    }
    catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
        throw error;
    }
};
exports.disconnect = disconnect;
