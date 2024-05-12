import * as z from 'zod';
export const personalSchema = z.object({
    firstName: z.string({ required_error: 'First name is required' }).min(1),
    lastName: z.string().optional(),
    email: z.string({ required_error: 'Email is required' }).min(1),
    phoneNumber: z.string({ required_error: 'Phone Number is required' }).min(1),
    // password: z.string({ required_error: 'Password is required' })
    //     .regex(/[a-zA-Z0-9]/, "Enter valid characters")
    //     .min(6, 'Password must contain more than 6 digits'),
    // confirm_password: ((msg: string) => z.string({ required_error: msg }).min(1, msg))(
    //     "Confirm password is required"
    // )
})
    // .superRefine(({ confirm_password, password }, ctx) => {
    //     if (confirm_password !== password) {
    //         ctx.addIssue({
    //             path: ['confirm_password'],
    //             code: 'custom',
    //             message: 'The passwords did not match',
    //         });
    //     }
    // });

