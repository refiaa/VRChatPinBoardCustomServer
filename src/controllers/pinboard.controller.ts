import { Request, Response } from 'express';
import pinboardService from '../services/pinboard.service';

export class PinboardController {
    async createPinboard(req: Request, res: Response): Promise<void> {
        try {
            const { pinboardId, hashKey } = req.query;

            if (!pinboardId || !hashKey) {
                res.status(400).json({ error: 'Missing required parameters' });
                return;
            }

            const pinboard = await pinboardService.createPinboard(
                pinboardId as string,
                hashKey as string
            );

            res.status(201).json(pinboard);
        } catch (error) {
            if ((error as any).code === 11000) {
                res.status(409).json({ error: 'Pinboard already exists' });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}

export default new PinboardController();