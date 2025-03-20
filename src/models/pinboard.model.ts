import mongoose, { Document, Schema } from 'mongoose';

export interface IPinboard extends Document {
    pinboardId: string;
    hashKey: string;
    createdAt: Date;
}

const PinboardSchema: Schema = new Schema({
    pinboardId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    hashKey: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IPinboard>('Pinboard', PinboardSchema);