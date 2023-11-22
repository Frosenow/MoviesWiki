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
import { LinearProgress, Link } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import MovieIcon from "@mui/icons-material/Movie";

import { MovieCard } from "../Card/MovieCard";
import { SERVER_URL } from "../../../config";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
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
            MovieMatrix
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
            <Button variant="contained">Main call to action</Button>
            <Button variant="outlined" startIcon={<TuneIcon />}>
              Filter
            </Button>
          </Stack>
        </Container>
      </Box>
      <InfiniteScroll
        dataLength={movies.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<LinearProgress color="secondary" />}
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
            {movies.map((movie) => (
              <Grid item key={movie} xs={12} sm={6} md={4}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </InfiniteScroll>
    </>
  );
}
