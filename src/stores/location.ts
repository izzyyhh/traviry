import { create } from "zustand";

export type Location = {
  latitude: number;
  longitude: number;
};

type LocationStore = {
  location: Location | null;
  setLocation: (location: Location) => void;
  clearLocation: () => void;
};

const useLocationStore = create<LocationStore>((set) => ({
  location: null,
  setLocation: (location: Location) => set({ location }),
  clearLocation: () => set({ location: null }),
}));

export default useLocationStore;
