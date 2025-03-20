import crypto from 'crypto';

export const createHash = (data: string): string => {
    return crypto.createHash('md5').update(data).digest('hex');
};

export const validateNoteHash = (
    pinboardId: string,
    localPosition: string,
    angle: string,
    colorHue: string,
    userHash: string,
    hashKey: string,
    providedHash: string
): boolean => {
    const expectedHash = createHash(pinboardId + localPosition + angle + colorHue + userHash + hashKey);
    return expectedHash === providedHash;
};