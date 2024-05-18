'use client'
import InputField from "@/components/Form/InputField";
import ContentWrapper from "@/components/Layout/ContentWrapper";
import NextBreadCrumb from "@/next-components/BreadCrumbs/NextBreadCrumb";
import { useHookForm } from '@/hooks/useHookForm';
import { SettingsDTO } from './personalType';
import Form from '@/components/Form/Form';
import { InputPhone } from '@/components/Form/InputPhone';
import { LoadingButton } from '@mui/lab';
import personalAction from './submit';
import { useFormState } from 'react-dom';
import { personalSchema } from './personalSchema';
import { ChangeEvent, useEffect, useState } from 'react';
import useSnackbar from '@/hooks/useSnackbar';
import { Alert, Snackbar } from '@mui/material';
import { useSession } from 'next-auth/react';
import profile from '@/assets/image-place.jpg';
import Image from "next/image";
import dummyImg from '@/assets/profile.png'
import ImageView from "@/components/Image/Image";
import { useSelectFile } from "@/hooks/useSelectFile";


export default function PersonalSettings() {
    const { methods } = useHookForm<SettingsDTO, typeof personalSchema>(personalSchema);
    const { formState, control } = methods;
    const { update } = useSession()
    const { openSnackbar, alertProps, snackProps } = useSnackbar()
    const [state, formAction] = useFormState(personalAction, { status: '', message: '' })
    const { file, preview, handleChange } = useSelectFile();

    const handleSubmit = (values: SettingsDTO) => {
        const form = new FormData();
        (Object.keys(values)as Array<keyof SettingsDTO>).forEach((key)=> {
            form.append(key, values[key])
        })
        if (file) {
            form.append('image', file)
        }
        formAction(form);
        update();
    }

    useEffect(() => {
        if (state?.status && state?.message) {
            openSnackbar({
                type: state.status,
                message: state.message
            })
        }
    }, [state])

    return (
        <ContentWrapper>
            <div>
                <NextBreadCrumb options={[{ label: 'Artist', to: '/' }]} />
                <div className="container">
                    <div className="p-3">
                        <h3>Personal Information</h3>
                        <hr />
                        <div className="mb-3">
                            <label htmlFor="profile-img">
                                <div className="photo">
                                    {preview ?
                                        <ImageView
                                            src={preview}
                                            alt="profile"
                                            className="custom-image"
                                            width={155}
                                            height={100}
                                        />
                                        :
                                        dummyImg ?
                                            <ImageView
                                                src={dummyImg}
                                                alt="profile"
                                                className="custom-image"
                                                width={155}
                                                height={100}
                                            />
                                            :
                                            <Image src={profile} alt="profile" className="custom-image" />
                                    }
                                </div>
                            </label>
                            <input type="file" id="profile-img" className="d-none" onChange={(e) => handleChange(e)} />
                        </div>
                        <Form onSubmit={handleSubmit} methods={methods}>
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

                                    {/* <div className="col-md-4 mt-4">
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
                                    </div> */}
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
                            <Snackbar {...snackProps}><Alert {...alertProps} /></Snackbar>
                        </Form>
                    </div>
                </div>
            </div>
        </ContentWrapper>
    )
}