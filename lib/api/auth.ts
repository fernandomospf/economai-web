import {api, TOKEN_KEY} from './client';

export interface User {
  id: string;
  name: string;
  email: string;
  provider: string;
  provider_id: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  status_active: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export async function register(payload: RegisterPayload): Promise<User> {
  const response = await api.post<{ message: string; data: User }>(
    '/auth/register',
    payload,
  );
  return response.data;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await api.post<{ message: string; data: LoginResponse }>(
    '/auth/login',
    payload,
  );

  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, response.data.access_token);
  }

  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await api.get<{ message: string; data: User }>('/auth/me');
  return response.data;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = '/login';
  }
}