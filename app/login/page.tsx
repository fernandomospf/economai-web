'use client';
import { HttpError, login } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { useAuthStore, selectSetUser } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';

interface LoginFormData {
  email: string;
  password: string;
}

const styles = {
  sidePanel: "hidden lg:flex lg:w-1/2 gradient-dark items-center justify-center p-12 relative overflow-hidden",
  sidePanelBg: "absolute inset-0 opacity-10 pointer-events-none",
  sidePanelBlob1: "absolute top-20 left-20 w-72 h-72 rounded-full bg-primary blur-3xl",
  sidePanelBlob2: "absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent blur-3xl",
  input: "h-12",
  submitButton: "w-full rounded-lg bg-emerald-500 py-3 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();
  const router = useRouter();
  const setUser = useAuthStore(selectSetUser);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      setUser(response.user);
      console.info('[/login] Login successful:', response.user.name);
      router.push('/dashboard');
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.statusCode === 401) {
          setError('email', { message: 'E-mail ou senha inválidos' });
          setError('password', { message: 'E-mail ou senha inválidos' });
        }
      }
    }
  };

  return (
    <div className="flex h-screen">

      <div className={styles.sidePanel}>
        <div className={styles.sidePanelBg}>
          <div className={styles.sidePanelBlob1} />
          <div className={styles.sidePanelBlob2} />
        </div>
        <div className="relative z-10 text-center max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-heading font-bold text-primary-foreground mb-4">
              <Link href="/">Econom<span className="text-emerald-500">AI</span></Link>
            </h1>
            <p className="text-lg text-primary-foreground/70">
              Comece a controlar suas finanças agora mesmo, sozinho ou em grupo.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-8">

        <div className="flex items-center pt-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para home
          </Link>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-zinc-900 mb-1">Bem-vindo de volta</h2>
            <p className="text-zinc-500 mb-8">Entre na sua conta para continuar</p>

            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-200 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors mb-6">
              <GoogleIcon />
              Entrar com Google
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 border-t border-zinc-200" />
              <span className="text-xs text-zinc-400 tracking-widest">OU CONTINUE COM EMAIL</span>
              <div className="flex-1 border-t border-zinc-200" />
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <FormField label="Email" error={errors.email?.message}>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  className={styles.input}
                  {...register('email', { required: 'E-mail é obrigatório' })}
                />
              </FormField>

              <FormField
                label="Senha"
                error={errors.password?.message}
                labelExtra={
                  <a href="#" className="text-sm text-emerald-500 hover:underline">
                    Esqueceu a senha?
                  </a>
                }
              >
                <Input
                  type="password"
                  placeholder="••••••••"
                  className={styles.input}
                  {...register('password', { required: 'Senha é obrigatória' })}
                />
              </FormField>

              <button
                disabled={isSubmitting}
                className={styles.submitButton}
                onClick={handleSubmit(onSubmit)}
              >
                {isSubmitting ? 'Entrando...' : 'Entrar →'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500">
              Não tem conta?{" "}
              <Link href="/signup" className="text-emerald-500 font-medium hover:underline">
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.08-6.08C34.46 3.1 29.5 1 24 1 14.82 1 7.07 6.48 3.64 14.22l7.08 5.5C12.4 13.67 17.73 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.42c-.54 2.9-2.18 5.36-4.64 7.04l7.18 5.57C43.18 37.1 46.1 31.3 46.1 24.5z" />
      <path fill="#FBBC05" d="M10.72 28.28A14.6 14.6 0 0 1 9.5 24c0-1.49.26-2.93.72-4.28l-7.08-5.5A23.9 23.9 0 0 0 0 24c0 3.86.92 7.5 2.54 10.72l8.18-6.44z" />
      <path fill="#34A853" d="M24 47c5.5 0 10.12-1.82 13.5-4.94l-7.18-5.57C28.6 38.1 26.43 39 24 39c-6.27 0-11.6-4.17-13.28-9.72l-8.18 6.44C6.07 43.52 14.82 47 24 47z" />
    </svg>
  );
}