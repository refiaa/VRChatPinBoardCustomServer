import { IPinboard } from '../models/pinboard.model';
import PinboardModel from '../models/pinboard.model';

export class PinboardService {
    async createPinboard(pinboardId: string, hashKey: string): Promise<IPinboard> {
        try {
            const pinboard = new PinboardModel({
                pinboardId,
                hashKey
            });
            return await pinboard.save();
        } catch (error) {
            throw error;
        }
    }

    async getPinboard(pinboardId: string): Promise<IPinboard | null> {
        try {
            return await PinboardModel.findOne({ pinboardId });
        } catch (error) {
            throw error;
        }
    }
}

export default new PinboardService();