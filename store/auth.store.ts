import {create} from 'zustand';
import {persist, devtools} from 'zustand/middleware';
import type {User} from '@/lib/api/auth';

interface AuthState {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setUser: (user: User) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setUser: (user: User) =>
          set(
            { user, isAuth: true },
            false,
            'auth/setUser',
          ),

        clearAuth: () =>
          set(
            initialState,
            false,
            'auth/clearAuth',
          ),

        setLoading: (isLoading: boolean) =>
          set(
            { isLoading },
            false,
            'auth/setLoading',
          ),
      }),
      {
        name: '@economai:auth',
        partialize: (state) => ({
          user: state.user,
          isAuth: state.isAuth,
        }),
      },
    ),
    {
      name: 'EconomAI:AuthStore',
    },
  ),
);

export const selectUser = (state: AuthStore) => state.user;
export const selectSetUser = (state: AuthStore) => state.setUser;
export const selectIsAuth = (state: AuthStore) => state.isAuth;
export const selectClearAuth = (state: AuthStore) => state.clearAuth;
export const selectIsLoading = (state: AuthStore) => state.isLoading;
export const selectSetLoading = (state: AuthStore) => state.setLoading;