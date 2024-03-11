import create from "zustand";

export type ToastType = "info" | "error";

export interface ToastItem {
  id: number;
  msg: string;
  type: ToastType;
}

interface ToastStoreState {
  toasts: ToastItem[];
  addToast: (msg: string, type?: ToastType) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastStoreState>((set) => ({
  toasts: [],
  addToast: (msg, type = "info") => {
    set((state) => ({
      toasts: [...state.toasts, { msg, type, id: Date.now() }]
    }));
  },
  removeToast(id) {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }));
  }
}));
