'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { HttpError } from "@/lib/api";
import { register as signup } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SignupFormData {
  name: string;
  birth_date: string;
  phone: string;
  email: string;
  password: string;
}

const styles = {
  input: "h-12",
  sidePanel: "hidden lg:flex lg:w-1/2 gradient-dark items-center justify-center p-12 relative overflow-hidden",
  sidePanelBg: "absolute inset-0 opacity-10 pointer-events-none",
  sidePanelBlob1: "absolute top-20 left-20 w-72 h-72 rounded-full bg-primary blur-3xl",
  sidePanelBlob2: "absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent blur-3xl",
  errorBox: "rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600",
  submitButton: "w-full h-12 gradient-primary text-primary-foreground font-semibold gap-2",
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<SignupFormData>();
  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await signup(data);
      toast.success('Conta criada com sucesso! Redirecionando para o login...');
      console.info('[/signup] Signup successful:', response.name);
      setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error('Erro ao criar conta: ' + error.message);
        if (error.statusCode === 409) {
          setError('email', { message: 'Este e-mail já está em uso' });
        }
        if (error.statusCode === 400) {
          setError('root', { message: error.message });
        }
      }
    }
  };

  return (
    <div className="h-screen flex">

      {/* Painel esquerdo */}
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

      {/* Painel direito */}
      <div className="flex flex-1 flex-col px-8">

        {/* Botão voltar */}
        <div className="flex items-center pt-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para home
          </Link>
        </div>

        {/* Formulário centralizado */}
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md space-y-6"
          >
            <div>
              <h2 className="text-3xl font-heading font-bold">Criar conta</h2>
              <p className="text-muted-foreground mt-2">Preencha seus dados para começar</p>
            </div>

            {errors.root && (
              <div className={styles.errorBox}>
                {errors.root.message}
              </div>
            )}

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

              <FormField label="Nome completo" error={errors.name?.message}>
                <Input
                  id="name"
                  placeholder="Maria Silva"
                  className={styles.input}
                  {...register("name", { required: 'Nome é obrigatório' })}
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Data de nascimento" error={errors.birth_date?.message}>
                  <Input
                    id="birth_date"
                    type="date"
                    className={styles.input}
                    {...register("birth_date", { required: 'Data de nascimento é obrigatória' })}
                  />
                </FormField>

                <FormField label="Telefone" error={errors.phone?.message}>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    className={styles.input}
                    {...register("phone", { required: 'Telefone é obrigatório' })}
                  />
                </FormField>
              </div>

              <FormField label="Email" error={errors.email?.message}>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className={styles.input}
                  {...register("email", { required: 'E-mail é obrigatório' })}
                />
              </FormField>

              <FormField label="Senha" error={errors.password?.message}>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    className="h-12 pr-10"
                    {...register("password", {
                      required: 'Senha é obrigatória',
                      minLength: { value: 8, message: 'Senha deve ter no mínimo 8 caracteres' }
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </FormField>

              <Button
                className={styles.submitButton}
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Criando conta...' : 'Criar conta'}
                <ArrowRight className="w-4 h-4" />
              </Button>

            </form>

            <p className="text-center text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Entrar
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;