'use client';

import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NewTransactionModalProps {
  open: boolean;
  onClose?: () => void;
}

interface TransactionFormData {
  type: 'income' | 'expense';
  category: string;
  title: string;
  description: string;
  amount: string;
  date: string;
}

const CATEGORIES = {
  income: ['Salário', 'Vale', 'Rendimento', 'Aluguel recebido', 'Freelance', 'Outro'],
  expense: ['Aluguel', 'Boleto', 'Parcela carro', 'Mercado', 'Farmácia', 'Delivery', 'Estudos', 'Outro'],
};

const formatDate = (date: Date) => date.toISOString().split('T')[0];

export default function NewTransactionModal({ open, onClose }: NewTransactionModalProps) {
  const [amountValue, setAmountValue] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [customCategories, setCustomCategories] = useState<{ income: string[]; expense: string[] }>({
    income: [],
    expense: [],
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState<'income' | 'expense'>('income');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    defaultValues: {
      type: 'income',
      date: formatDate(new Date()),
    }
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, '');
    const formatted = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(onlyNumbers) / 100);
    setAmountValue(formatted);
    setValue('amount', formatted);
  };

  const handleTypeSelect = (type: 'income' | 'expense') => {
    setSelectedType(type);
    setValue('type', type);
    setCategorySearch('');
    setValue('category', '');
  };

  const allCategories = [
    ...CATEGORIES[selectedType],
    ...customCategories[selectedType],
  ];

  const filteredCategories = allCategories.filter((c) =>
    c.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const handleCategorySelect = (category: string) => {
    setCategorySearch(category);
    setValue('category', category);
    setShowDropdown(false);
  };

  const handleAddNewCategory = () => {
    if (!categorySearch.trim()) return;
    setCustomCategories((prev) => ({
      ...prev,
      [selectedType]: [...prev[selectedType], categorySearch],
    }));
    setValue('category', categorySearch);
    setShowDropdown(false);
  };

  const onSubmit = (data: TransactionFormData) => {
    console.info('[NewTransactionModal] Submit:', data);
    onClose?.();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Nova Transação</h2>
          <span
            className="border w-8 h-8 flex justify-center items-center bg-[#a0a1a023] rounded-full cursor-pointer hover:bg-zinc-100 transition-colors"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </span>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

          <FormField label="Tipo" error={errors.type?.message}>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleTypeSelect('income')}
                className={cn(
                  "h-10 rounded-lg border text-sm font-medium transition-colors",
                  selectedType === 'income'
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                )}
              >
                + Entrada
              </button>
              <button
                type="button"
                onClick={() => handleTypeSelect('expense')}
                className={cn(
                  "h-10 rounded-lg border text-sm font-medium transition-colors",
                  selectedType === 'expense'
                    ? "bg-red-500 text-white border-red-500"
                    : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                )}
              >
                - Saída
              </button>
            </div>
            <input type="hidden" {...register('type', { required: 'Tipo é obrigatório' })} />
          </FormField>

          <FormField label="Categoria" error={errors.category?.message}>
            <div className="relative">
              <Input
                type="text"
                placeholder={`Ex. ${selectedType === 'income' ? 'Salário' : 'Aluguel'}`}
                value={categorySearch}
                onChange={(e) => {
                  setCategorySearch(e.target.value);
                  setShowDropdown(true);
                  setValue('category', '');
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              />
              <input type="hidden" {...register('category', { required: 'Categoria é obrigatória' })} />

              {showDropdown && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg overflow-hidden">
                  {filteredCategories.map((c) => (
                    <div
                      key={c}
                      className="px-4 py-2.5 text-sm cursor-pointer hover:bg-zinc-50 transition-colors"
                      onMouseDown={() => handleCategorySelect(c)}
                    >
                      {c}
                    </div>
                  ))}
                  {categorySearch.trim() && !allCategories.find((c) => c.toLowerCase() === categorySearch.toLowerCase()) && (
                    <div
                      className="px-4 py-2.5 text-sm cursor-pointer text-emerald-600 hover:bg-emerald-50 transition-colors border-t border-zinc-100 font-medium"
                      onMouseDown={handleAddNewCategory}
                    >
                      + Adicionar "{categorySearch}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </FormField>

          <FormField label="Título" error={errors.title?.message}>
            <Input
              type="text"
              placeholder="Ex. Salário março"
              {...register('title', { required: 'Título é obrigatório' })}
            />
          </FormField>

          <FormField label="Descrição" error={errors.description?.message}>
            <Input
              type="text"
              placeholder="Descrição da transação..."
              {...register('description', { required: 'Descrição é obrigatória' })}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Valor" error={errors.amount?.message}>
              <Input
                type="text"
                placeholder="R$ 0,00"
                value={amountValue}
                {...register('amount', { required: 'Valor é obrigatório' })}
                onChange={handleAmountChange}
              />
            </FormField>

            <FormField label="Data" error={errors.date?.message}>
              <Input
                type="date"
                {...register('date', { required: 'Data é obrigatória' })}
              />
            </FormField>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full h-12 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </button>
        </form>
      </div>
    </div>
  );
}