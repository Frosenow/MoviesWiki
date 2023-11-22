import { HashRouter, Route, Routes } from "react-router-dom";

import { MovieProvider } from "./context/MovieContext";
import Home from "./components/Home/Home";
import Movie from "./components/Movie/Movie";
import AppBarMain from "./components/AppBar/AppBarMain";

function App() {
  return (
    <MovieProvider>
      <HashRouter>
        <AppBarMain />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:movieId" element={<Movie />} />
        </Routes>
      </HashRouter>
    </MovieProvider>
  );
}

export default App;
