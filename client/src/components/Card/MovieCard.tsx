import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import Chip from "@mui/joy/Chip";
import StarIcon from "@mui/icons-material/Star";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIcon from "@mui/icons-material/Info";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { MovieContext } from "../../context/MovieContext";
import React from "react";

export function MovieCard({ movie }) {
  const { selectedGenre } = useContext(MovieContext);
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {movie.title}
        </Typography>
        <Typography>{movie.overview}</Typography>
        <Stack spacing={1} sx={{ mt: "1rem" }}>
          <Chip
            color="primary"
            onClick={function () {}}
            size="sm"
            variant="soft"
            startDecorator={<StarIcon />}
          >
            <Typography variant="subtitle2">{movie.vote_average}</Typography>
          </Chip>
          <Chip
            color="primary"
            onClick={function () {}}
            size="sm"
            variant="soft"
            startDecorator={<AttachMoneyIcon />}
          >
            <Typography variant="subtitle2">{movie.budget}</Typography>
          </Chip>
          <Chip
            color="primary"
            onClick={function () {}}
            size="sm"
            variant="soft"
            startDecorator={<InfoIcon />}
          >
            <Typography variant="subtitle2"> {movie.movie_status}</Typography>
          </Chip>
          {movie.release_date && (
            <Chip
              color="primary"
              onClick={function () {}}
              size="sm"
              variant="soft"
              startDecorator={<CalendarMonthIcon />}
            >
              <Typography variant="subtitle2">
                {" "}
                {moment(movie.release_date).format("DD/MM/YYYY")}
              </Typography>
            </Chip>
          )}
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/movies/${movie.movie_id}`)}
        >
          More Details
        </Button>
      </CardActions>
    </Card>
  );
}
