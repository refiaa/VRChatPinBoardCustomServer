import { INote } from '../models/note.model';
import NoteModel from '../models/note.model';

export class NoteService {
    async addNote(noteData: Partial<INote>): Promise<INote> {
        try {
            const note = new NoteModel(noteData);
            return await note.save();
        } catch (error) {
            throw error;
        }
    }

    async getNotesByPinboardId(pinboardId: string): Promise<INote[]> {
        try {
            return await NoteModel.find({ pinboardId })
                .sort({ timestamp: -1 })
                .exec();
        } catch (error) {
            throw error;
        }
    }
}

export default new NoteService();