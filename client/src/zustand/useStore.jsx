import {create} from "zustand";

const useUserStore = create((set) => ({
  users: [],
  setUsers: (newUsers) => set({ users: newUsers }),
}));

export default useUserStore;
