'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { verification } from '@/lib/actions';
import { AuthWrapper } from '@/components/auth';
import { FormError, FormSuccess } from '@/components/shared';

export const VerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const onSubmit = useCallback(() => {
    if (!token) return;
    verification(token).then((data) => {
      setError(data?.error);
      setSuccess(data?.success);
    });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <AuthWrapper headerLabel="Xác thực tài khoản" backButtonLabel="Trở lại đăng nhập" backButtonHref="/auth/login">
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </AuthWrapper>
  );
};
