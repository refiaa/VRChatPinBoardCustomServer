import mongoose from 'mongoose';
import { config } from './env.config';

export const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(config.mongodb.uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            dbName: 'pinboard',
            retryWrites: true,
            w: 'majority',
            maxPoolSize: 10,
            minPoolSize: 5
        });

        console.log('MongoDB connected successfully');

        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected. Attempting to reconnect...');
        });

        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close();
                console.log('MongoDB connection closed through app termination');
                process.exit(0);
            } catch (error) {
                console.error('Error during MongoDB disconnection:', error);
                process.exit(1);
            }
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};