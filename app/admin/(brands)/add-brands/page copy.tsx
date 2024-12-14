'use client'

import * as z from 'zod';
import Form from "@/components/Form/Form";
import profile from '@/assets/image-place.jpg';
import { useHookForm } from "@/hooks/useHookForm";
import InputField from '@/components/Form/InputField';
import { useSelectFile } from '@/hooks/useSelectFile';
import ImageView from '@/components/Image/Image';
import Image from 'next/image';
import { LoadingButton } from '@mui/lab';

export const schema = z.object({
    name: ((msg: string) => z.string({ required_error: msg }))("Please enter brand name"),
    slug: ((msg: string) => z.string({ required_error: msg }))("Please enter slug"),
})

type AddBrandValues = {
    name: string;
    slug: string;
}

const dummyImg = null;

export default function AddBrands() {
    const { methods } = useHookForm<AddBrandValues, typeof schema>(schema)
    const { formState, control } = methods;
    const { preview, file, handleChange } = useSelectFile();

    const handleAddBrand = (values: any) => {
        console.log(values, 'values of formdata')//

    }

    return (
        <>
            <h2 className="font-semibold">Add New Brand</h2>
            <p className="f-14">
                Update your Customer necessary information from here!
            </p>

            <section>
                <div className="brand-form mt-5">
                    <div className="mb-5">
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
                    <Form
                        methods={methods}
                        onSubmit={handleAddBrand}
                    >
                        <div className="grid grid-cols-1 w-6/12	gap-4">
                            <InputField
                                control={control}
                                error={formState.errors["name"]}
                                type='text'
                                label='Brand Name'
                            />
                            <InputField
                                control={control}
                                error={formState.errors["name"]}
                                type='text'
                                label='Slug'
                            />
                        </div>
                    </Form>
                    <LoadingButton
                    className='my-4'
                    variant='contained'
                    >
                        Save
                    </LoadingButton>
                </div>
            </section>
        </>
    )
}