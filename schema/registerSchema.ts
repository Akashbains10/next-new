import * as z from 'zod';

export const registerSchema = z.object({
    name: z.string({ required_error: 'Name is required' }).min(1),
    email: z.string({ required_error: 'Email is required' }).min(1),
    password: z.string({ required_error: 'Password is required' }).min(1),
    confirm_password: z.string({ required_error: 'Confirm Password is required' }).min(1),
})
    .refine(data => data.password === data.confirm_password, {
        message: 'Password does not match',
        path: ['confirm_password']
    })