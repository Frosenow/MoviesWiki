import { useEffect, useState, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "@mui/material";

import { MovieContext } from "../../context/MovieContext";
import { MovieCard } from "../Card/MovieCard";
import AutocompleteFilter from "../Autocomplete/AutocompleteFilter";
import { SERVER_URL } from "../../../config";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/Frosenow">
        Filip Potepa
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { selectedGenre } = useContext(MovieContext);
  const RESPONSE_LIMIT = 9;

  async function getMovies() {
    try {
      const moviesData = await fetch(
        `${SERVER_URL}/movies?page=${page}&limit=${RESPONSE_LIMIT}`
      ).then((moviesData) => moviesData.json());

      if (moviesData.length === 0 || moviesData.length < RESPONSE_LIMIT) {
        setHasMore(false);
      }

      setMovies((prevMovies) => [...prevMovies, ...moviesData]);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getGenre() {
    try {
      const genre = await fetch(
        `${SERVER_URL}/movies/filter?page=${page}&limit=${RESPONSE_LIMIT}&filterType=${selectedGenre.genre_name}`
      ).then((genre) => genre.json());

      if (genre.length === 0 || genre.length < RESPONSE_LIMIT) {
        setHasMore(false);
      }

      setMovies((prevMovies) => [...prevMovies, ...genre]);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    setMovies([]); // Reset movies array
    setPage(1); // Reset page number
    setHasMore(true); // Reset hasMore state
  }, [selectedGenre]);

  useEffect(() => {
    if (selectedGenre) {
      getGenre();
    } else {
      getMovies();
    }
  }, [selectedGenre, page]);

  return (
    <Container>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Movie Matrix
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Navigate through the world of cinema with detailed insights and
            summaries.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <AutocompleteFilter />
          </Stack>
        </Container>
      </Box>
      <Container>
        <InfiniteScroll
          dataLength={movies.length}
          next={() => setPage((prevPage) => prevPage + 1)}
          hasMore={hasMore}
          endMessage={
            <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
              <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
              >
                You have reached the end of our movie database!
              </Typography>
              <Copyright />
            </Box>
          }
        >
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {movies.map((movie, idx) => (
                <Grid item key={idx} xs={12} sm={6} md={4}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </InfiniteScroll>
      </Container>
    </Container>
  );
}
