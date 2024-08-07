'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { register } from '@/lib/actions';
import { RegisterSchema } from '@/schema/auth';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AuthWrapper } from '@/components/auth';
import { CustomInput, FormError, FormSuccess } from '@/components/shared';

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <AuthWrapper headerLabel="Tạo tài khoản mới" backButtonLabel="Đã có tài khoản, đăng nhập?" backButtonHref="/auth/login" showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <CustomInput name="name" label="Họ tên (*)" control={form.control} placeholder="Hoang Bach" disabled={isPending} />
            <CustomInput name="email" label="Email (*)" type="email" control={form.control} placeholder="bachtv150902@gmail.com" disabled={isPending} />
            <CustomInput name="password" label="Mật khẩu (*)" type="password" control={form.control} placeholder="******" disabled={isPending} />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button disabled={isPending} type="submit" className="w-full">
            Tạo tài khoản
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
