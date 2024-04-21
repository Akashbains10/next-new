'use client'
import LoadingButton from '@mui/lab/LoadingButton';
import ServerForm from "@/components/Form/ServerForm";
import { useHookForm } from "@/hooks/useHookForm";
import * as z from 'zod';
import InputField from "@/components/Form/InputField";
import { PasswordField } from "@/components/Form/PasswordField";
import { useFormState, useFormStatus } from 'react-dom';
import registerAction from './action';
import { useEffect } from 'react';
import useSnackbar from '@/hooks/useSnackbar';
import { Alert, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';

const schema = z.object({
    name: z.string({ required_error: 'Name is required' }).min(1),
    email: z.string({ required_error: 'Email is required' }).min(1),
    password: z.string({ required_error: 'Password is required' }).min(1),
    confirm_password: z.string({ required_error: 'Confirm Password is required' }).min(1),
})
    .refine(data => data.password === data.confirm_password, {
        message: 'Password does not match',
        path: ['confirm_password']
    })

type RegisterValues = {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}

const initalState = {
    status: '',
    message: ''
}

export default function RegisterComponent() {
    const router = useRouter();
    const { methods } = useHookForm(schema);
    const { pending } = useFormStatus();
    const [state, formAction] = useFormState(registerAction, initalState)
    const { openSnackbar, snackProps, alertProps } = useSnackbar();
    const { formState, control } = methods;

    const handleSubmit = (values: FormData) => {
        formAction(values);
    }

    useEffect(() => {
        if (state.status && state.message) {
            openSnackbar({
                type: state.status,
                message: state.message
            })
        }
        if (state.status === 'success') {
            setTimeout(() => {
                router.push('/auth/login')
            }, 1000);
        }
    }, [state])

    return (
        <ServerForm<RegisterValues>
            onSubmit={handleSubmit}
            methods={methods}
        >
            <div style={{ paddingLeft: '50px', paddingRight: '50px' }}>
                <InputField
                    control={control}
                    name="name"
                    error={formState.errors['name']}
                    label="Name"
                    fullWidth={true}
                    type="text"
                    id='name'
                />
            </div>
            <div style={{ paddingLeft: '50px', paddingRight: '50px', marginTop: '20px' }}>
                <InputField
                    control={control}
                    name="email"
                    error={formState.errors['email']}
                    label="Email"
                    fullWidth={true}
                    type="email"
                    id='email'
                />
            </div>
            <div style={{ paddingLeft: '50px', paddingRight: '50px', marginTop: '20px' }}>
                <PasswordField
                    control={control}
                    name="password"
                    error={formState.errors['password']}
                    label="Password"
                    id='pass'

                />
            </div>
            <div style={{ paddingLeft: '50px', paddingRight: '50px', marginTop: '20px' }}>
                <PasswordField
                    control={control}
                    name="confirm_password"
                    error={formState.errors['confirm_password']}
                    label="Confirm Password"
                    id='confirm_pass'
                />
            </div>

            <div style={{ paddingLeft: '50px', paddingRight: '50px', marginTop: '20px' }}>
                <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={pending}
                >
                    Submit
                </LoadingButton>
            </div>
            <Snackbar {...snackProps}><Alert {...alertProps} /></Snackbar>

        </ServerForm>
    )
}