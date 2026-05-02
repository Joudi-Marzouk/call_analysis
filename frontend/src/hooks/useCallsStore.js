import { create } from 'zustand';

const useCallsStore = create((set) => ({
  calls: JSON.parse(localStorage.getItem('calls')) || [],

  setCalls: (newCalls) => {
    localStorage.setItem('calls', JSON.stringify(newCalls));

    // 🔥 مهم: نخبر كل الصفحات
    window.dispatchEvent(new Event('calls-updated'));

    set({ calls: newCalls });
  }
}));

export default useCallsStore;