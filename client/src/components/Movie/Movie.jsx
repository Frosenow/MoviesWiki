import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MovieCardExtended } from "../Card/MovieCardExtended";
import { SERVER_URL } from "../../../config";

export default function Movie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);

  async function getMovieInfo() {
    try {
      let [movieData, movieCast] = await Promise.all([
        fetch(`${SERVER_URL}/movies/${movieId}`).then((res) => res.json()),
        fetch(`${SERVER_URL}/movies/${movieId}?cast=true`).then((res) =>
          res.json()
        ),
      ]);
      setMovie(...movieData);
      setCast(movieCast);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (movieId) {
      getMovieInfo();
    }
  }, [movieId]);

  return movie && <MovieCardExtended movie={movie} cast={cast} />;
}
