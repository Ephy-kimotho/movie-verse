import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMovieStore = create(
  persist(
    (set) => ({
      movieName: "avengers",
      setMovieName: (name) => set({ movieName: name }),
    }),
    { name: "movies" }
  )
);

export default useMovieStore;
