'use server'
import User from "@/models/user.model"
import { registerSchema } from "@/schema/registerSchema";
import db from "@/utils/connectDB";
import bcrypt from 'bcryptjs';


export default async function registerAction(prevState: any, formData: FormData) {
    try {
        const validFields = registerSchema.safeParse(formData);
        if (!validFields.success) {
            return {status: 'failed', message: 'Invalid Fields'}
        }
        db.connectDB();
        const checkUserExists = await User.findOne({ email: formData.email });
        if (checkUserExists) {
            return { status: 'error', message: 'User already exists' }
        }
        formData.password = await bcrypt.hash(formData.password, 8);
        await User.create(formData)
        return { status: 'success', message: 'User created Successfuly' }
    } catch (error) {
        console.log({ error: error, stack: error.stack })
        return { status: 'failed', message: 'Failed to create user' }
    }

}