'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPassword } from '@/lib/actions';
import { ForgotPasswordSchema } from '@/schema/auth';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AuthWrapper } from '@/components/auth';
import { CustomInput, FormError, FormSuccess } from '@/components/shared';

export const ForgotPasswordForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      forgotPassword(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <AuthWrapper headerLabel="Quên mật khẩu" backButtonLabel="Trở lại đăng nhập" backButtonHref="/auth/login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <CustomInput name="email" label="Email (*)" type="email" control={form.control} placeholder="bachtv150902@gmail.com" disabled={isPending} />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button disabled={isPending} type="submit" className="w-full">
            Gửi email quên mật khẩu
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
