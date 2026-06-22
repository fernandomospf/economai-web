'use client';
import { logout } from '@/lib/api';
import { cn } from '@/lib/utils';
import { ArrowRightLeft, HelpCircle, LayoutDashboard, LogOut, MessageSquarePlus, Target, User, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Sidebar() {
    const pathname = usePathname();
    const menuOptions = [
  { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, href: '/dashboard' },
  { name: 'Transações', icon: <ArrowRightLeft className="w-5 h-5" />, href: '/dashboard/transactions' },
  { name: 'Grupos', icon: <Users className="w-5 h-5" />, href: '/dashboard/groups' },
  { name: 'Metas', icon: <Target className="w-5 h-5" />, href: '/dashboard/goals' },
];

const infoOptions = [
  { name: 'Perfil', icon: <User className="w-5 h-5" />, href: '/dashboard/profile' },
  { name: 'FAQ', icon: <HelpCircle className="w-5 h-5" />, href: '/dashboard/faq' },
  { name: 'Sugestões', icon: <MessageSquarePlus className="w-5 h-5" />, href: '/dashboard/suggestions' },
];
  return (
    <aside className="w-64 h-screen bg-[#131720] flex flex-col">

      <div className="p-6">
        <Link href="/dashboard">
          <h3 className="text-white text-xl font-bold">
            Econom<span className="text-emerald-500">AI</span>
          </h3>
        </Link>
      </div>

      <nav className="flex-1 px-4 mt-4">
        <ul className="flex flex-col gap-1">
          {menuOptions.map((option) => (
            <li key={option.name}>
              <Link
                href={option.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  pathname === option.href
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                {option.icon}
                <span className="text-sm font-medium">{option.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-4 mb-2">
        <hr className="border-white/10" />
      </div>

      <nav className="px-4">
        <ul className="flex flex-col gap-1">
          {infoOptions.map((option) => (
            <li key={option.name}>
              <Link
                href={option.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  pathname === option.href
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                {option.icon}
                <span className="text-sm font-medium">{option.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-4 mt-2 mb-2">
        <hr className="border-white/10" />
      </div>

      <div className="px-4 pb-6">
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>

    </aside>
  )
}

export default Sidebar;
