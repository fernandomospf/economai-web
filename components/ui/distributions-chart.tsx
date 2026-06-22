'use client';
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#6b59c8', '#3db86e', '#b63c29', '#f59e0b', '#3b82f6', '#ec4899'];

interface Transaction {
  id: number;
  title: string;
  description: string;
  type: string;
  category: string;
  amount: number;
}

interface DistributionsChartProps {
  transactions: Transaction[];
}

export default function DistributionsChart({ transactions }: DistributionsChartProps) {
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

  return (
    <div 
      className="bg-white rounded-2xl basis-1/3 p-8 shadow-sm border border-zinc-100 h-[400px]"
    >
      <h1 className="font-bold text-base mb-2">Distribuição</h1>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={distributionData}
            cx="50%"
            cy="45%"
            innerRadius="45%"
            outerRadius="65%"
            dataKey="value"
            paddingAngle={3}
          />
          <Tooltip
            formatter={(value, name) => [
              Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value)),
              name
            ]}
          />
          <Legend
            formatter={(value) => (
              <span style={{ fontSize: 12, color: '#6b7280' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};