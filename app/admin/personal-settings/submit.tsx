'use server'
import { getServerSession } from "next-auth";
import { personalSchema } from "./personalSchema"


export default async function personalAction(prev: any, formValues: any) {
    const isValidate = personalSchema.safeParse(formValues);
    if (!isValidate.success) {
        return { status: 400, message: 'Invalid fields' }
    }
    // const session = getServerSession(authOptions)
    const session = await getServerSession();
    console.log(session, 'action in server form ***********')
}
