import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

type AuthState = {
  active: boolean;
};

type AuthActions = {
  show: () => void;
  showNot: () => void;
};

export const authStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      active: false,

      show: () => {
        set({
          active: true,
        });
      },
      showNot: () => {
        set({
          active: false,
        });
      },
    }),
    {
      name: 'storage-userstores',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
