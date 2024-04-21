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
  const { methods } = useHookForm(schema);
  const { formState, control } = methods;


  const handleFormSubmit = async (values: any) => {
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      });
      console.log(res, 'sign in response')
      if (res) {
        router.push('/')
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  return (
    <ServerForm<FormValues>
      methods={methods}
      onSubmit={handleFormSubmit}
    >
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