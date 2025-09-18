
import Image from 'next/image';
import { Leaf } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';
import { placeholderImages } from '@/lib/placeholder-images';

export default function LoginPage() {
  const loginImage = placeholderImages.find((img) => img.id === 'login-hero');

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="relative hidden h-full bg-gray-100 lg:block">
        {loginImage && (
          <Image
            src={loginImage.imageUrl}
            alt={loginImage.description}
            width={1280}
            height={1920}
            className="h-full w-full object-cover"
            data-ai-hint={loginImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/30 to-transparent" />
        <div className="absolute bottom-8 left-8 text-primary-foreground">
          <h1 className="text-4xl font-bold">BlueVault</h1>
          <p className="mt-2 text-lg">Your trusted partner in mangrove conservation.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12 min-h-screen">
        <div className="mx-auto grid w-full max-w-[400px] gap-6">
          <div className="grid gap-2 text-center">
            <Leaf className="h-10 w-10 text-primary mx-auto" />
            <h1 className="text-3xl font-bold font-headline">Welcome to BlueVault</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your dashboard
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
