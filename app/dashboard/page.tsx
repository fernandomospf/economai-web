'use client';
import CardDashboard from "@/components/ui/card-dashboard";
import { Download, Sheet, Wallet } from "lucide-react";
import RecentTransactions from "@/components/ui/recent-transactions";
import IncomeOutputChart from "@/components/ui/income-output-chart";
import NewTransactionModal from "@/components/ui/new-transaction-modal";
import { useState } from "react";

const COLORS = ['#6b59c8', '#3db86e', '#b63c29', '#f59e0b', '#3b82f6', '#ec4899'];

function Dashboard() {
  const currentDate = new Date();
  const monthName = Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(currentDate);
  const year = new Date().getFullYear();
  const buttonStyle = "border w-40 h-12 flex rounded-xl items-center justify-center gap-2 cursor-pointer";
  const [open, setOpen] = useState(false);

  const transactions = [
    { id: 1, title: "Salário", description: "Empresa XYZ", type: "income", category: "Salário", amount: 5200 },
    { id: 2, title: "Aluguel", description: "Imobiliária", type: "expense", category: "Moradia", amount: 1200 },
    { id: 3, title: "Mercado", description: "Supermercado ABC", type: "expense", category: "Alimentação", amount: 450 },
    { id: 4, title: "Freelance", description: "Cliente Y", type: "income", category: "Freelance", amount: 800 },
    { id: 5, title: "Internet", description: "Operadora", type: "expense", category: "Serviços", amount: 150 },
    { id: 6, title: "Farmácia", description: "Drogasil", type: "expense", category: "Saúde", amount: 200 },
    { id: 7, title: "Curso", description: "Udemy", type: "expense", category: "Estudos", amount: 80 },
  ];

  const barData = [
    { name: 'Out', entradas: 6000, saidas: 3800 },
    { name: 'Nov', entradas: 5800, saidas: 4200 },
    { name: 'Dez', entradas: 7100, saidas: 5100 },
    { name: 'Jan', entradas: 6100, saidas: 3900 },
    { name: 'Fev', entradas: 5500, saidas: 4000 },
    { name: 'Mar', entradas: 7600, saidas: 2500 },
  ];

  const distributionData = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc: { name: string; value: number; fill: string }[], t) => {
      const existing = acc.find((item) => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({
          name: t.category,
          value: t.amount,
          fill: COLORS[acc.length % COLORS.length],
        });
      }
      return acc;
    }, []);


  const totalExpenses = distributionData.reduce((sum, item) => sum + item.value, 0);
  const totalIncomes = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncomes - totalExpenses;

  return (
    <div className='flex flex-col px-16 py-16'>

      <section className="flex justify-between">
        <div>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <p>Resumo financeiro de <span className="capitalize">{monthName}</span> {year}.</p>
        </div>
        <div className="flex gap-4">
          <button className={buttonStyle}>
            <Sheet className="w-4 h-4" /> Excel
          </button>
          <button className={buttonStyle}>
            <Download className="w-4 h-4" /> PDF
          </button>
        </div>
      </section>
      <section>
        <div className="mt-4 h-10 flex gap-2">
          <button className="font-bold border shadow-sm border-zinc-100 w-40 h-10 rounded-xl bg-[#131720] cursor-pointer flex items-center justify-center gap-2 text-[#17b55e]"
          onClick={() => setOpen(true)}  
        >
             Nova transação
          </button>
        </div>
      </section>
      <section className="mt-8 flex gap-4 justify-between">
        <CardDashboard
          title="Saldo Atual"
          value={balance}
          icon={Wallet}
          iconColor="#6b59c8"
        />
        <CardDashboard
          title="Entradas"
          value={totalIncomes}
          icon={Wallet}
          iconColor="#3db86e"
        />
        <CardDashboard
          title="Saídas"
          value={totalExpenses}
          icon={Wallet}
          iconColor="#b63c29"
        />
      </section>

      <section className="mt-4">
        <IncomeOutputChart barData={barData} transactions={transactions} />
        <RecentTransactions transactions={transactions} />
      </section>
      <NewTransactionModal open={open} onClose={() => setOpen(false)}/>
    </div>
  );
}

export default Dashboard;