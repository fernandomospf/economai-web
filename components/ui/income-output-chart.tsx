'use client';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import DistributionsChart from './distributions-chart';

interface BarData {
  name: string;
  entradas: number;
  saidas: number;
}

interface Transaction {
  id: number;
  title: string;
  description: string;
  type: string;
  category: string;
  amount: number;
}

interface IncomeOutputChartProps {
  barData: BarData[];
  transactions: Transaction[];
}

export default function IncomeOutputChart({ barData, transactions }: IncomeOutputChartProps) {
  return (
    <div className="flex gap-4">
      <div className="bg-white rounded-2xl basis-2/3 p-8 shadow-sm border border-zinc-100 h-[400px]">
        <h1 className="font-bold text-base mb-4">Entradas vs Saídas</h1>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={barData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="entradas" fill="#3db86e" radius={[6, 6, 0, 0]} />
            <Bar dataKey="saidas" fill="#b63c29" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <DistributionsChart transactions={transactions} />
    </div>
  );
}