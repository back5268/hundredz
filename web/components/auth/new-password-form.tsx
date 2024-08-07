'use client';

import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { newPassword } from '@/lib/actions';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { NewPasswordSchema } from '@/schema/auth';
import { CustomInput, FormError, FormSuccess } from '@/components/shared';
import { AuthWrapper } from '@/components/auth';

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: ''
    }
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      newPassword(values, token).then((data) => {
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
            <CustomInput name="password" label="Password (*)" type="password" control={form.control} placeholder="******" disabled={isPending} />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button disabled={isPending} type="submit" className="w-full">
            Xác nhận
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
