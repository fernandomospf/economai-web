'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore, selectIsAuth, selectUser } from '@/store/auth.store';
import { TOKEN_KEY } from '@/lib/api';

interface UseAuthGuardReturn {
    isAuthenticated: boolean;
    isLoading: boolean;
}

export function useAuthGuard(): UseAuthGuardReturn {
    const router = useRouter();
    const pathname = usePathname();
    const isAuth = useAuthStore(selectIsAuth);
    const user = useAuthStore(selectUser);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);

        if (!token || !isAuth || !user) {
            localStorage.removeItem(TOKEN_KEY);
            router.replace('/login');
            return;
        }

        setIsLoading(false);
    }, [isAuth, user, router, pathname]);

    return {
        isAuthenticated: isAuth && !!user,
        isLoading,
    };
}