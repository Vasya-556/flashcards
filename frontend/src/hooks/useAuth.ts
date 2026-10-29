import { create } from 'zustand'
import { authTypes } from '../types';

type AuthState = {
    auth: authTypes.User | null;
    setAuth: (auth: authTypes.User) => void;
    removeAuth: () => void;
}

const useAuth = create<AuthState>((set) => ({
    auth: null,
    setAuth: (auth) => set({ auth: auth }),
    removeAuth: () => set({ auth: null }),
}))

export {
    useAuth
}