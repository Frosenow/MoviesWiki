const express = require("express");
const cors = require("cors");
const pool = require("./db.config");
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get("/movies", async (req, res) => {
  const { page, limit } = req.query || 1;
  const offset = (page - 1) * limit;

  try {
    const movies = await pool.query(
      "SELECT * FROM movies.movie LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    res.json(movies.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/movies/filter", async (req, res) => {
  const { filterType } = req.query;
  try {
    const filteredMovies = await pool.query(
      `SELECT
    m.movie_id,
    m.title,
    g.genre_name
  FROM
    movies.movie m
  JOIN movies.movie_genres mg ON m.movie_id = mg.movie_id
  JOIN movies.genre g ON mg.genre_id = g.genre_id
  WHERE
    g.genre_name = $1;`,
      [filterType]
    );
    res.json(filteredMovies.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/genres", async (req, res) => {
  try {
    const genres = await pool.query(
      "SELECT * FROM movies.genre ORDER BY genre_name"
    );
    res.json(genres.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/movies/:id", async (req, res) => {
  const { cast } = req.query;
  try {
    const { id } = req.params;

    if (cast) {
      const cast = await pool.query(
        `SELECT
          p.person_name,
          mc.character_name
        FROM
          movies.movie_cast mc
        JOIN movies.person p ON mc.person_id = p.person_id
        WHERE
          mc.movie_id = $1
        ORDER BY
          mc.cast_order;`,
        [id]
      );
      res.json(cast.rows);
    }

    const movie = await pool.query(
      "SELECT * FROM movies.movie WHERE movie_id = $1",
      [id]
    );
    res.json(movie.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is working on PORT: ${PORT}`);
});
