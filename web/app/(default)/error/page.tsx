import Link from 'next/link';
import { BsExclamationTriangle } from 'react-icons/bs';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ErrorPage = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <div className="w-full flex justify-center items-center gap-y-4 flex-col">
            <h1 className="text-3xl font-bold">ERROR</h1>
            <p className="text-muted-foreground text-sm">Có lỗi xảy ra</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full items-center flex justify-center">
            <BsExclamationTriangle className="text-destructive w-8 h-8" />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="font-nomal w-full" size="sm" asChild>
            <Link href="/">Trở lại trang chủ</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorPage;
