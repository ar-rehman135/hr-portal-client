'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Label } from '@/shadcn/label';
import { Input } from '@/shadcn/input';
import { Button } from '@/shadcn/button';
import { Checkbox } from '@/shadcn/checkbox';
import { PasswordInput } from '@/shadcn/password-input';
import { Form, FormControl, FormField, FormMessage } from '@/shadcn/form';
import { useAppSelector } from '@/store/hooks';
import { getAuthDataSelector } from '@/store/selectors';
import { useLoginMutation } from '@/store/features/auth/unProtectedApi';
import AuthLayout from '@/layouts/AuthLayout';
import axios from 'axios';

const authSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email')
    .min(1, 'Email is required'),
  password: z.string().min(1, 'Password is Required'),
});

export function Login() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector(getAuthDataSelector);
  const [hide, setHide] = useState<{
    password: boolean;
  }>({
    password: false,
  });
  const [login, { isLoading }] = useLoginMutation();
  const [remember, setRemember] = useState<boolean>(false);

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: 'ar.rehmanmirza@gmail.com',
      password: 'StrongPassword123!',
    },
  });

  const handleCheckboxChange = (val: boolean) => {
    setRemember(val);
  };

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    try {
      const payload = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: 'h2slt84ni83bpmisc723ii6om',
        AuthParameters: {
          USERNAME: 'ar.rehmanmirza@gmail.com',
          PASSWORD: 'StrongPassword123!',
        },
      };

      const response = await axios.post(
        'https://cognito-idp.us-east-1.amazonaws.com/',
        payload,
        {
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
          },
        }
      );

      console.log('response', response);

      if (response?.data?.AuthenticationResult) {
        localStorage.setItem(
          'token',
          response.data.AuthenticationResult.IdToken
        );
        router.push('/');
      }
    } catch (error) {
      console.log('error');
    }
  };

  const toggleHidePassword = () => {
    setHide((prev) => ({
      ...prev,
      password: !prev.password,
    }));
  };

  return (
    <AuthLayout>
      <div className="relative min-h-full flex items-center justify-center w-[100%]">
        <div className="grid w-3/4">
          <h1 className="text-4xl font-semibold md:pt-20 pt-10">Log in</h1>
          <div className="flex align-center pt-3">
            <p className="text-base text-lightGrey pb-6">
              Welcome back! Please enter your details.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full gap-0.5"
            >
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="mt-5" />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <>
                        <Label className="text-sm">Email*</Label>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            name="email"
                            placeholder="Enter your Email"
                            autoComplete="off"
                            className="bg-none focus:outline-primary"
                          />
                        </FormControl>
                        <FormMessage className="text-destructive mt-2" />
                      </>
                    )}
                  />
                  <div className="mt-5" />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <>
                        <Label className="text-sm">Password*</Label>
                        <FormControl>
                          <PasswordInput
                            {...field}
                            hide={hide}
                            autoComplete="off"
                            onChange={field.onChange}
                            toggleHide={toggleHidePassword}
                          />
                        </FormControl>
                        <FormMessage className="text-destructive mt-2" />
                      </>
                    )}
                  />
                </div>
                <div className="mt-5 flex justify-between w-full">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      // id="remember_me"
                      checked={Boolean(remember)}
                      onCheckedChange={handleCheckboxChange}
                      className="text-primary w-5 h-5  "
                    />
                    <Label>Remember Me</Label>
                  </div>
                </div>
                <Button
                  variant="default"
                  type="submit"
                  className="w-full mt-5 font-bold  text-[#FFFFFF]"
                  disabled={false}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </AuthLayout>
  );
}
