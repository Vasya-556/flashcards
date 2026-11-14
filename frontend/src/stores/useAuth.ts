import { create } from 'zustand'
import { authTypes } from '../types';

type AuthState = {
    auth: authTypes.User | null;
    setAuth: (auth: authTypes.User) => void;
    removeAuth: () => void;

    csrfToken: string | null;
    setCsrfToken: (csrfToken: string) => void;
    removeCsrfToken: () => void;
}

const useAuth = create<AuthState>((set) => ({
    auth: null,
    setAuth: (auth) => set({ auth: auth }),
    removeAuth: () => set({ auth: null }),

    csrfToken: null,
    setCsrfToken: (csrfToken) => set({ csrfToken: csrfToken}),
    removeCsrfToken: () => set({ csrfToken: null })
}))

export {
    useAuth
}