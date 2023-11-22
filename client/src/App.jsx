import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Movie from "./components/Movie/Movie";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:movieId" element={<Movie />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
