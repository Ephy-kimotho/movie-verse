import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMovieStore = create(
  persist(
    (set) => ({
      searchQuery: "avengers",
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    { name: "movies" }
  )
);

export default useMovieStore;
