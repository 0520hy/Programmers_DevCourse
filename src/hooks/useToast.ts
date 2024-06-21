import useToastStore from '@/store/toastStore';

export const UseToast = () => {
  const showToast = useToastStore((state) => state.addToast);

  return { showToast };
};
