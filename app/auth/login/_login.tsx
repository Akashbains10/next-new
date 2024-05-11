'use client'

import InputField from "@/components/Form/InputField";
import { PasswordField } from "@/components/Form/PasswordField";
import ServerForm from "@/components/Form/ServerForm";
import { useHookForm } from "@/hooks/useHookForm";
import { LoadingButton } from "@mui/lab";
import { useFormState } from "react-dom";
import * as z from 'zod';
import { loginAction } from "./action";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/react";
import NextSelectField from "@/next-components/Select/NextSelectField";
import { Error } from "@/components/Error/Error";

type FormValues = {
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string({ required_error: "Email is required" }).min(1),
  password: z.string({ required_error: "Password is required" }).min(1)
})

const initialState = {
  status: '',
  message: ''
}

export const LoginComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState('admin');
  const { methods } = useHookForm(schema);
  const { formState, control } = methods;


  const handleFormSubmit = (values: any) => {
    setLoading(true)
    try {
      signIn('credentials', {
        email: values.email,
        password: values.password,
        role: role,
        redirect: false
      })
        .then((response) => {
          if (response) {
            router.push('/admin')
            console.log(response, 'response*************');
          }
        })
        .catch((err) => {
          console.log(err, 'err*****************#######');
        });
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const options = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
  ];

  return (
    <ServerForm<FormValues>
      methods={methods}
      onSubmit={handleFormSubmit}
    >
      <div className="grid justify-items-end mr-12 my-3">
        <NextSelectField
          label="Role"
          placeholder="Select Role"
          className="w-40"
          color="primary"
          defaultSelected={[role]}
          setValue={setRole}
          options={options}
        />
      </div>
      <div style={{ paddingLeft: '50px', paddingRight: '50px' }}>
        <InputField
          control={control}
          name="email"
          error={formState.errors['email']}
          label="Email"
          fullWidth={true}
          type="email"
        />
      </div>
      <div style={{ paddingLeft: '50px', paddingRight: '50px', marginTop: '20px' }}>
        <PasswordField
          control={control}
          error={formState.errors['password']}
          label="Password"
          name="password"
        />
        <Error type="success" className="mt-3" message="Something went wrong" />
      </div>
      <div className="mt-3" style={{ paddingLeft: '50px', paddingRight: '50px' }}>
        <LoadingButton
          variant="contained"
          type="submit"
          loading={loading}
        >
          Submit
        </LoadingButton>
      </div>

    </ServerForm>
  )
}