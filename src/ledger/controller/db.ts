import mongoose from 'mongoose';

export const connect = async (databaseUrl?: string): Promise<void> => {
    try {
        await mongoose.connect(databaseUrl ?? 'mongodb://localhost:27017/ledger');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

export const disconnect = async (): Promise<void> => {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
      throw error;
    }
  };
