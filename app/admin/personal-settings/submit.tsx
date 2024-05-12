'use server'
import User from "@/models/user.model";
import { personalSchema } from "./personalSchema"
import { getServerAuthSession } from "@/server/auth";


export default async function personalAction(prev: any, formValues: any) {
    const isValidate = personalSchema.safeParse(formValues);
    if (!isValidate.success) {
        return { status: 'error', message: 'Invalid fields' }
    }
    const session = await getServerAuthSession();
    if (session && session.user) {
        try {
            const id = session?.user?._id;
            const payload = {
                name: `${formValues?.firstName} ${formValues?.lastName}`,
                email: formValues?.email,
            }
            const findUser = await User.findByIdAndUpdate(id, payload, {new: true});
            if (!findUser) {
                return { status: 'error', message: 'Invalid User' }
            }
            return {status: 'success', message: 'Profile updated successfuly'}
        } catch (error) {
            console.log(error)
        }

    }
}
