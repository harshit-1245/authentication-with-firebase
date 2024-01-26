import { create } from 'zustand';

const useAuthStore = create((set) => ({
  email: '',
  mobileNumber: '',
  password: '',
  confirmPassword: '',
  isChecked: false,
  isPasswordShown: false,
  isConfirmedPasswordShown: false,

  setField: (field, value) => set((state) => ({ [field]: value })),
  togglePasswordVisibility: (field) => set((state) => ({ [field]: !state[field] })),
  resetForm: () =>
    set({
      email: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      isChecked: false,
    }),
}));

export default useAuthStore;