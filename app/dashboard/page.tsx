import CardDashboard from "@/components/ui/card-dashboard";
import { Download, Sheet, Wallet } from "lucide-react";

function Dashboard() {
  const currentDate = new Date();
  const monthName = Intl.DateTimeFormat('pt-br', { month: 'long' }).format(currentDate);
  const year = new Date().getFullYear();
  const buttonStyle = "border w-40 h-12 flex rounded-xl items-center justify-center gap-2 cursor-pointer"
  return (
    <div className='flex flex-col px-60 py-16'>
      <section className="flex justify-between">
        <div>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <p>Resumo financeiro de <span className="capitalize">{monthName}</span> {year}.</p>
        </div>
        <div className="flex gap-4">
          <button className={buttonStyle}><Sheet /> Excel</button>
          <button className={buttonStyle}><Download /> PDF</button>
        </div>
      </section>
      <section className="mt-16 flex gap-2 justify-between">
        <CardDashboard
          title="Saldo Atual"
          value={0}
          icon={Wallet}
          iconColor="#6b59c8"
        />
        <CardDashboard
          title="Entradas"
          value={0}
          icon={Wallet}
          iconColor="#3db86e"
        />
        <CardDashboard
          title="Saídas"
          value={0}
          icon={Wallet}
          iconColor="#b63c29"
        />
      </section>
    </div>
  )
}

export default Dashboard
