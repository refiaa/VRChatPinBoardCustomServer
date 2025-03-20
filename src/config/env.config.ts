import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}

export const config = {
    port: process.env.PORT || 3000,
    mongodb: {
        uri: process.env.MONGODB_URI
    },
    env: process.env.NODE_ENV || 'development'
};