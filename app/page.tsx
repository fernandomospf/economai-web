'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  Users,
  Target,
  Trophy,
  Shield,
  Zap,
  ChevronDown,
  Star,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const features = [
  {
    icon: BarChart3,
    title: "Dashboard inteligente",
    desc: "Visualize receitas, despesas e saldo em tempo real com gráficos interativos.",
  },
  {
    icon: Users,
    title: "Grupos financeiros",
    desc: "Gerencie finanças compartilhadas com amigos, família ou colegas de trabalho.",
  },
  {
    icon: Target,
    title: "Metas de economia",
    desc: "Defina objetivos financeiros e acompanhe seu progresso com indicadores visuais.",
  },
  {
    icon: Trophy,
    title: "Conquistas e gamificação",
    desc: "Ganhe conquistas ao manter hábitos financeiros saudáveis.",
  },
  {
    icon: Shield,
    title: "Segurança total",
    desc: "Seus dados financeiros protegidos com criptografia de ponta a ponta.",
  },
  {
    icon: Zap,
    title: "Relatórios automáticos",
    desc: "Receba relatórios detalhados sobre seus padrões de gastos.",
  },
];

const testimonials = [
  {
    name: "Ana Carolina",
    role: "Empreendedora",
    text: "O EconomAI mudou minha relação com dinheiro. Consigo ver exatamente para onde vai cada centavo.",
    rating: 5,
  },
  {
    name: "Rafael Santos",
    role: "Desenvolvedor",
    text: "A funcionalidade de grupos é incrível! Uso com minha família para organizar as despesas da casa.",
    rating: 5,
  },
  {
    name: "Juliana Mendes",
    role: "Designer",
    text: "Interface linda e super intuitiva. As conquistas me motivam a economizar cada vez mais!",
    rating: 5,
  },
];

const faqs = [
  {
    q: "O EconomAI é gratuito?",
    a: "Sim! O plano gratuito inclui funcionalidades essenciais para controle financeiro pessoal. Planos pagos oferecem recursos avançados.",
  },
  {
    q: "Posso usar em grupo?",
    a: "Sim, a funcionalidade de grupos permite que você compartilhe e gerencie finanças com outras pessoas.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Absolutamente. Utilizamos criptografia de ponta a ponta e seguimos as melhores práticas de segurança do mercado.",
  },
  {
    q: "Como funciona o plano Ultimate?",
    a: "O plano Ultimate é um pagamento único e vitalício. Você paga uma vez e tem acesso a todos os recursos para sempre.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function LandingPage() {
  const [mobileNav, setMobileNav] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-foreground">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-emerald-500">
            EconomAI
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/planos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Planos
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Criar conta
              </Button>
            </Link>
          </nav>

          <button className="md:hidden" onClick={() => setMobileNav(!mobileNav)}>
            {mobileNav ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileNav && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden border-t border-border bg-background px-4 pb-4 space-y-2"
          >
            <Link href="/planos" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileNav(false)}>
              Planos
            </Link>
            <Link href="/login" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileNav(false)}>
              Entrar
            </Link>
            <Link href="/cadastro" onClick={() => setMobileNav(false)}>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white mt-2">
                Criar conta
              </Button>
            </Link>
          </motion.div>
        )}
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-6">
              Controle financeiro simplificado
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              Suas finanças sob
              <span className="text-emerald-500"> controle total</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Organize receitas, despesas e metas financeiras em um só lugar. Sozinho ou em grupo, o EconomAI torna
              a gestão financeira simples e inteligente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cadastro">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold gap-2 h-12 px-8">
                  Começar grátis <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/planos">
                <Button size="lg" variant="outline" className="h-12 px-8">
                  Ver planos
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold mb-4">
              Tudo que você precisa
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg max-w-xl mx-auto">
              Funcionalidades pensadas para simplificar sua vida financeira.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i + 2}>
                <Card className="h-full border-border/50 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                      <f.icon className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold mb-4">
              O que dizem nossos usuários
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i}>
                <Card className="h-full border-border/50">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">"{t.text}"</p>
                    <div>
                      <p className="font-medium text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
          >
            Perguntas frequentes
          </motion.h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 rounded-lg bg-card border border-border/50 text-left hover:shadow-sm transition-shadow"
                >
                  <span className="font-medium text-sm">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-4 pb-4 pt-2 text-sm text-muted-foreground leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0d1f2d] rounded-2xl p-10 sm:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Comece a organizar suas finanças hoje
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Crie sua conta gratuita e descubra como o EconomAI pode transformar sua vida financeira.
            </p>
            <Link href="/cadastro">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold gap-2 h-12 px-8">
                Criar conta grátis <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">© 2026 EconomAI. Todos os direitos reservados.</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/planos" className="hover:text-foreground transition-colors">Planos</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}