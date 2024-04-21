import Token from '@/models/token.model';
import db from '@/utils/connectDB';
import { v4 as uuidv4 } from 'uuid';

export const generateToken = async (email: string) => {
    const token = uuidv4();
    const expiresIn = new Date(new Date().getTime() + (3600 * 1000));

    await checkExistingToken(email);
    await db.connectDB();
    const verifyToken = await Token.create({
        email: email,
        token: token,
        expiresIn: expiresIn
    });

    return verifyToken;
};

export const checkExistingToken = async (email: string) => {
    await db.connectDB();
    const findExistingToken = await Token.findOne({ email: email });
    if (findExistingToken) {
        findExistingToken.delete();
    }
}