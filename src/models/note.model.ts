import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
    pinboardId: string;
    localPosition: string;
    angle: string;
    colorHue: string;
    content: string;
    userHash: string;
    timestamp: Date;
}

const NoteSchema: Schema = new Schema({
    pinboardId: {
        type: String,
        required: true,
        index: true
    },
    localPosition: {
        type: String,
        required: true
    },
    angle: {
        type: String,
        required: true
    },
    colorHue: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userHash: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<INote>('Note', NoteSchema);