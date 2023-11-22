import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MovieIcon from "@mui/icons-material/Movie";

import { MovieCard } from "../Card/MovieCard";

const SERVER_URL = "http://localhost:5000";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const RESPONSE_LIMIT = 9;

  async function getMovies() {
    try {
      const moviesData = await fetch(
        `${SERVER_URL}/movies?page=${page}&limit=${RESPONSE_LIMIT}`
      ).then((moviesData) => moviesData.json());

      if (moviesData.length === 0 || moviesData.length < RESPONSE_LIMIT) {
        setHasMore(false);
      }

      setMovies((prev) => [...prev, ...moviesData]);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getMovies();
  }, [page]);

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <MovieIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            MoviesWiki
          </Typography>
        </Toolbar>
      </AppBar>
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
            Album layout
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained">Main call to action</Button>
            <Button variant="outlined">Secondary action</Button>
          </Stack>
        </Container>
      </Box>
      <InfiniteScroll
        dataLength={movies.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
        endMessage={<p>You went to the end</p>}
      >
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {movies.map((movie) => (
              <Grid item key={movie} xs={12} sm={6} md={4}>
                <MovieCard />
              </Grid>
            ))}
          </Grid>
        </Container>
      </InfiniteScroll>
    </>
  );
}
