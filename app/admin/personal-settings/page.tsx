'use client'
import * as z from 'zod';
import InputField from "@/components/Form/InputField";
import ContentWrapper from "@/components/Layout/ContentWrapper";
import NextBreadCrumb from "@/next-components/BreadCrumbs/NextBreadCrumb";
import { useHookForm } from '@/hooks/useHookForm';
import { SettingsDTO } from './personalType';
import Form from '@/components/Form/Form';
import { InputPhone } from '@/components/Form/InputPhone';
import { PasswordField } from '@/components/Form/PasswordField';
import { LoadingButton } from '@mui/lab';
import { getServerAuthSession } from '@/server/_auth';
import personalAction from './submit';
import { useFormState } from 'react-dom';
import { personalSchema } from './personalSchema';

export default function PersonalSettings() {
    const { methods } = useHookForm<SettingsDTO, typeof personalSchema>(personalSchema);
    const { formState, control } = methods;
    const [state, formAction] = useFormState(personalAction, {status: '', message: ''})

   
    return (
        <ContentWrapper>
            <div>
                <NextBreadCrumb options={[{ label: 'Artist', to: '/' }]} />
                <div className="container">
                    <div className="p-3">
                        <h3>Personal Information</h3>
                        <hr />
                        <Form onSubmit={(values)=> formAction(values)} methods={methods}>
                            <div className="main-content">
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <InputField
                                            control={control}
                                            error={formState.errors['firstName']}
                                            label='First Name'
                                            name='firstName'
                                            type="text"
                                            fullWidth={true}
                                        />
                                    </div>

                                    <div className="col-md-4 ml-3">
                                        <InputField
                                            control={control}
                                            error={formState.errors['lastName']}
                                            label='Last Name'
                                            name='lastName'
                                            type="text"
                                            fullWidth={true}
                                        />
                                    </div>

                                    <div className="col-md-4 mt-4">
                                        <InputField
                                            control={control}
                                            error={formState.errors['email']}
                                            label='Email'
                                            name='email'
                                            type="text"
                                            fullWidth={true}
                                        />
                                    </div>

                                    <div className="col-md-4 mt-4 ml-3">
                                        <InputPhone
                                            control={control}
                                            error={formState.errors['phoneNumber']}
                                            name='phoneNumber'
                                        />
                                    </div>

                                    <div className="col-md-4 mt-4">
                                        <PasswordField
                                            control={control}
                                            error={formState.errors['password']}
                                            name='password'
                                            label='Password'
                                        />
                                    </div>

                                    <div className="col-md-4 mt-4 ml-3">
                                        <PasswordField
                                            control={control}
                                            error={formState.errors['confirm_password']}
                                            name='confirm_password'
                                            label='Confirm Password'
                                        />
                                    </div>
                                </div>
                                <div className="btn">
                                    <LoadingButton
                                        variant="contained"
                                        type="submit"
                                    >
                                        Save
                                    </LoadingButton>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </ContentWrapper>
    )
}