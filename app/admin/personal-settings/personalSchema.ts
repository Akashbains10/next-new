import * as z from 'zod';
export const personalSchema = z.object({
    firstName: z.string({ required_error: 'First name is required' }).min(1),
    lastName: z.string().optional(),
    email: z.string({ required_error: 'Email is required' }).min(1),
    phoneNumber: z.string({ required_error: 'Phone Number is required' }).min(1),
})

