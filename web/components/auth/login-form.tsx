'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/lib/actions';
import { LoginSchema } from '@/schema/auth';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomInput, FormError, FormSuccess } from '@/components/shared';
import { AuthWrapper } from '@/components/auth';

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email đã được sử dụng!' : '';

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      login(values, callbackUrl).then((data) => {
        if (data?.error) {
          setError(data?.error);
          form.reset();
        }
        if (data?.success) {
          setSuccess(data?.success);
          form.reset();
        }
        if (data?.twoFactor) {
          setShowTwoFactor(true);
        }
      });
    });
  };

  return (
    <AuthWrapper headerLabel="Chào mừng trở lại" backButtonLabel="Chưa có tài khoản, đăng ký?" backButtonHref="/auth/register" showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor ? (
              <CustomInput name="code" label="Mã xác thực (*)" control={form.control} placeholder="123456" disabled={isPending} />
            ) : (
              <>
                <CustomInput name="email" label="Email (*)" type="email" control={form.control} placeholder="bachtv150902@gmail.com" disabled={isPending} />
                <CustomInput name="password" label="Mật khẩu (*)" type="password" control={form.control} placeholder="******" disabled={isPending} />
                <Button size="sm" variant="link" asChild className="px-0 font-normal">
                  <Link href="/auth/forgot-password">Quên mật khẩu</Link>
                </Button>
              </>
            )}
          </div>
          <FormSuccess message={success} />
          <FormError message={error || urlError} />
          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? 'Xác nhận' : 'Đăng nhập'}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
