import { Minus, Plus, TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import EmptyImage from '@/public/empty-transaction.webp';

interface Transaction {
  id: string | number;
  type: string;
  title: string;
  description: string;
  amount: number;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm border-zinc-100 mt-4 min-h-[400px] p-8">
      {
        !transactions.length ? (
          <div className='h-[300px] w-full flex flex-col items-center justify-center relative'>
            <Image
              src={EmptyImage}
              alt="Empty transaction"
              className='absolute w-60 h-60 opacity-50'
            />
            <h1 className='text-lg font-bold z-10 relative'>Sem registro de transações</h1>
          </div>
        ) : (<>
          <div className="flex justify-between">
            <h1 className="font-bold text-base">Transações recentes</h1>
            <p className="text-emerald-500 cursor-pointer underline">Ver todas</p>
          </div >
          <div>
            <ul className="mt-8 box-border">
              {transactions.map((transaction) => (
                <React.Fragment key={transaction.id}>
                  <li className="mb-4 flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                      {transaction.type === 'income' ? (
                        <span
                          className="w-10 h-10 flex items-center justify-center rounded"
                          style={{ backgroundColor: '#26b6861c' }}
                        >
                          <TrendingUp className="text-sm" style={{ color: '#26b685' }} />
                        </span>
                      ) : (
                        <span
                          className="w-10 h-10 flex items-center justify-center rounded"
                          style={{ backgroundColor: '#db4e4e1a' }}
                        >
                          <TrendingDown style={{ color: '#db4e4f' }} />
                        </span>
                      )}
                      <div className="flex flex-col">
                        <h4 className="text-sm font-bold">{transaction.title}</h4>
                        <p className="text-xs text-[#6a7181]">{transaction.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {transaction.type === 'income' ? (
                        <Plus className="h-3 w-3" style={{ color: '#26b685' }} />
                      ) : (
                        <Minus className="h-3 w-3" style={{ color: '#db4e4f' }} />
                      )}
                      <p
                        className="text-sm font-bold"
                        style={{ color: transaction.type === 'income' ? '#26b685' : '#db4e4f' }}
                      >
                        {Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(transaction.amount)}
                      </p>
                    </div>
                  </li>

                  {transaction.id !== transactions[transactions.length - 1]?.id && (
                    <hr className="mb-4" />
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </>)
      }
    </div >
  )
}