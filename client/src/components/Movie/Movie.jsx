import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MovieCardExtended } from "../Card/MovieCardExtended";
import { SERVER_URL } from "../../../config";

export default function Movie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  async function getMovie() {
    try {
      const movieData = await fetch(`${SERVER_URL}/movies/${movieId}`).then(
        (movieData) => movieData.json()
      );
      setMovie(...movieData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getMovie();
  }, []);

  return movie && <MovieCardExtended movie={movie} />;
}
