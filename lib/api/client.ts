const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';
export const TOKEN_KEY = '@economai:token';

export interface ApiError {
    statusCode: number;
    message: string | string[];
    path: string;
    timestamp: string;
}

export class HttpError extends Error {
    constructor(
        public readonly statusCode: number,
        message: string,
    ) {
        super(message);
        this.name = 'HttpError';
    }
}

async function request<T>(
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    body?: unknown,
): Promise<T> {

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (typeof window !== 'undefined') {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    const url = `${BASE_URL}${path}`;
    const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({
            statusCode: response.status,
            message: 'Erro inesperado, tente novamente mais tarde.',
        })) as ApiError;

        if (response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem(TOKEN_KEY);
                window.location.href = '/';
            }
        }

        const message = Array.isArray(error.message) ? error.message.join(', ') : error.message;
        throw new HttpError(response.status, message);
    }

    return response.json() as Promise<T>;
}


export const api = {
    get: <T>(path: string) => request<T>('GET', path),
    post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
    put: <T>(path: string, body?: unknown) => request<T>('PUT', path, body),
    patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, body),
    delete: <T>(path: string, body?: unknown) => request<T>('DELETE', path, body),
};