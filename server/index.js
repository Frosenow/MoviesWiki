const express = require("express");
const cors = require("cors");
const pool = require("./db.config");
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ZROBIC PROSTA MOVIE WIKI ZEBY SIE DALO DODAWAC FILMY, USUWAC, PRZEGLADAC PO WIECEJ INFORMACJI I AKTUALIZOWAC

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

app.get("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
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
