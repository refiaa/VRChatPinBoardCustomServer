import { Request, Response } from 'express';
import noteService from '../services/note.service';
import pinboardService from '../services/pinboard.service';
import { validateNoteHash } from '../utils/hash.util';
import { INote } from '../models/note.model';

export class NoteController {
    async addNote(req: Request, res: Response): Promise<void> {
        try {
            const { pinboardId, localPosition, angle, colorHue, content, userHash, hash } = req.query;

            if (!pinboardId || !localPosition || !angle || !colorHue || !content || !userHash || !hash) {
                res.status(400).json({ error: 'Missing required parameters' });
                return;
            }

            const pinboard = await pinboardService.getPinboard(pinboardId as string);
            if (!pinboard) {
                res.status(404).json({ error: 'Pinboard not found' });
                return;
            }

            const isValidHash = validateNoteHash(
                pinboardId as string,
                localPosition as string,
                angle as string,
                colorHue as string,
                userHash as string,
                pinboard.hashKey,
                hash as string
            );

            if (!isValidHash) {
                res.status(403).json({ error: 'Invalid hash' });
                return;
            }

            const note = await noteService.addNote({
                pinboardId: pinboardId as string,
                localPosition: localPosition as string,
                angle: angle as string,
                colorHue: colorHue as string,
                content: content as string,
                userHash: userHash as string
            });

            res.status(201).json(note);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getNotes(req: Request, res: Response): Promise<void> {
        try {
            const { pinboardId } = req.query;

            if (!pinboardId) {
                res.status(400).json({ error: 'Missing pinboardId' });
                return;
            }

            const pinboard = await pinboardService.getPinboard(pinboardId as string);
            if (!pinboard) {
                res.status(418).json({ error: 'Pinboard not found, please create one.' });
                return;
            }

            const notes = await noteService.getNotesByPinboardId(pinboardId as string);
            const notesMap: Record<string, Partial<INote>> = {};

            notes.forEach((note: INote) => {
                if (note._id) {
                    notesMap[note._id.toString()] = {
                        localPosition: note.localPosition,
                        angle: note.angle,
                        colorHue: note.colorHue,
                        content: note.content,
                        userHash: note.userHash,
                        timestamp: note.timestamp
                    };
                }
            });

            res.status(200).json(notesMap);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new NoteController();