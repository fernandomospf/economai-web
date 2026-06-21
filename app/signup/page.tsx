'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { HttpError } from "@/lib/api";
import { register as signup } from "@/lib/api";
import { useRouter } from "next/navigation";

interface SignupFormData {
    name: string;
    birth_date: Date;
    phone: string;
    email: string;
    password: string;
}

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<SignupFormData>();
    const router = useRouter();

    const onSubmit = async (data: SignupFormData) => {
        try {
            const response = await signup(data);
            console.info('[/signup] Signup successful:', response.name);
             router.push('/login')
        } catch (error) {
            if (error instanceof HttpError) {
                if (error.statusCode === 409) {
                    setError('email', { message: 'Este e-mail já está em uso' });
                }
                if (error.statusCode === 400) {
                    setError('root', { message: error.message });
                }
            }
        }
    }

    return (
        <div className="h-screen flex">
            <div className="hidden lg:flex lg:w-1/2 gradient-dark items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
                </div>
                <div className="relative z-10 text-center max-w-md">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h1 className="text-4xl font-heading font-bold text-primary-foreground mb-4">
                            Econom<span className="text-emerald-500">AI</span>
                        </h1>
                        <p className="text-lg text-primary-foreground/70">
                            Comece a controlar suas finanças agora mesmo, sozinho ou em grupo.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
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

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome completo</Label>
                            <Input id="name" placeholder="Maria Silva" className="h-12" {...register("name", { required: true })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="birthdate">Data de nascimento</Label>
                                <Input id="birthdate" type="date" className="h-12" {...register("birth_date", { required: true })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Telefone</Label>
                                <Input id="phone" type="tel" placeholder="(11) 99999-9999" className="h-12" {...register("phone", { required: true })} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="seu@email.com" className="h-12" {...register("email", { required: true })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mínimo 8 caracteres"
                                    className="h-12 pr-10"
                                    {...register("password", { required: true, minLength: 8 })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <Button className="w-full h-12 gradient-primary text-primary-foreground font-semibold gap-2" onClick={handleSubmit(onSubmit)}>
                            Criar conta <ArrowRight className="w-4 h-4" />
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
    );
};

export default Signup;
