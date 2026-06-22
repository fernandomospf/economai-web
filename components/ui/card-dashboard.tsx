import { ElementType } from "react";

interface CardDashboardProps {
  title: string;
  icon: ElementType;
  iconColor: string;
  value: string | number;
  valueColor?: string;
}

export default function CardDashboard({ title, value = 0, valueColor, icon: Icon, iconColor }: CardDashboardProps) {
  const formatValue = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(value));

  return (
    <div className="w-[340px] bg-white rounded-xl shadow-sm border border-zinc-100 p-6 h-[120px] flex flex-col gap-2 grow-1">
      <div className="flex justify-between">
        <h4 className="text-sm text-zinc-500">{title}</h4>
        <span
          className="w-10 h-10 flex items-center justify-center rounded-full"
          style={{ backgroundColor: `${iconColor}20` }}
        >
          <Icon className="w-5 h-5" style={{ color: iconColor }} />
        </span>
      </div>
      <h2 className="text-2xl font-bold" style={{ color: valueColor }}>
        {formatValue}
      </h2>
    </div>
  );
}