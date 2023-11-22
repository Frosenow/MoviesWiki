import { createContext, useState } from "react";

export const MovieContext = createContext({
  selectedGenre: null,
  setSelectedGenre: () => {},
});

export const MovieProvider = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <MovieContext.Provider value={{ selectedGenre, setSelectedGenre }}>
      {children}
    </MovieContext.Provider>
  );
};
