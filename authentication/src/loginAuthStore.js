import {create} from 'zustand';

const useAuthStore = create((set) => ({
  isPasswordShown: false,
  isEmailModalVisible: false,
  isForgotPasswordModalVisible: false,
  forgotPasswordEmail: '',
  setField: (field, value) => set((state) => ({ [field]: value })),
  togglePasswordVisibility: () =>
    set((state) => ({ isPasswordShown: !state.isPasswordShown })),
  setIsEmailModalVisible: (isVisible) => set({ isEmailModalVisible: isVisible }),
  setIsForgotPasswordModalVisible: (isVisible) => set({ isForgotPasswordModalVisible: isVisible }),
  setForgotPasswordEmail: (email) => set({ forgotPasswordEmail: email }),
}));

export default useAuthStore;