import { useEffect, useState, useContext } from "react";
import { Autocomplete, TextField } from "@mui/material";

import { MovieContext } from "../../context/MovieContext";
import { SERVER_URL } from "../../../config";

export default function AutocompleteFilter() {
  const [genres, setGenres] = useState([]);
  const { selectedGenre, setSelectedGenre } = useContext(MovieContext);

  async function getGenres() {
    try {
      const genres = await fetch(`${SERVER_URL}/genres`).then((genres) =>
        genres.json()
      );
      setGenres([...genres]);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={genres}
      getOptionLabel={(genre) => genre.genre_name}
      onChange={(_, genre) => {
        setSelectedGenre(genre);
      }}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Genre" onWheel={(e) => e.target.blur()} />
      )}
    />
  );
}
