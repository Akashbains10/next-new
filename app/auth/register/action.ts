'use server'
import User from "@/models/user.model"
import { registerSchema } from "@/schema/registerSchema";
import db from "@/utils/connectDB"

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
        await User.create(formData)
        return { status: 'success', message: 'User created Successfuly' }
    } catch (error) {
        console.log({ error: error, stack: error.stack })
        return { status: 'failed', message: 'Failed to create user' }
    }

}