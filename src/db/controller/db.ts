import mongoose from 'mongoose';

export const connect = async (databaseUrl: string): Promise<void> => {
  try {
    console.debug('Connecting to MongoDB...');
    console.debug(`Database URL: ${databaseUrl}`);
    await mongoose.connect(databaseUrl);
  } catch (error) {
    console.error('Error connecting to MongoDB:');
    console.error((error as Error).message);
    console.error(JSON.stringify(error));
    throw error;
  }
};

export const disconnect = async (): Promise<void> => {
  try {
    console.debug('Disconnecting from MongoDB...');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error disconnecting from MongoDB:');
    console.error((error as Error).message);
    console.error(JSON.stringify(error));
    throw error;
  }
};
