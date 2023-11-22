import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Movie from "./components/Movie/Movie";
import AppBarMain from "./components/AppBar/AppBarMain";

function App() {
  return (
    <HashRouter>
      <AppBarMain />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:movieId" element={<Movie />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
