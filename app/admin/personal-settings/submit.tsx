'use server'
import User from "@/models/user.model";
import { personalSchema } from "./personalSchema"
import { getServerAuthSession } from "@/server/auth";
import { uploadFile } from "@/utils/upload";


export default async function personalAction(prev: any, formValues: FormData) {
    const isValidate = personalSchema.safeParse(formValues);
    // if (!isValidate.success) {
    //     return { status: 'error', message: 'Invalid fields' }
    // }
    const firstName = formValues.get('firstName');
    const lastName = formValues.get('lastName');
    const email = formValues.get('email');
    const phoneNumber = formValues.get('phoneNumber');
    const session = await getServerAuthSession();
    if (session && session.user) {
        try {
            let image = session.user.image;
            const file = formValues.get('image') as File;
            if (file) {
                const resImg = await uploadFile(file)
                console.log(resImg, 'resImage in submit tsx of line 24')
                image = resImg;
            }
            const id = session?.user?._id;
            const payload = { name: `${firstName} ${lastName}`, email, phoneNumber, image }
            const findUser = await User.findByIdAndUpdate(id, payload, { new: true });
            if (!findUser) {
                return { status: 'error', message: 'Invalid User' }
            }
            return { status: 'success', message: 'Profile updated successfuly' }
        } catch (error) {
            console.log(error)
        }
    }
}
