import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MovieIcon from "@mui/icons-material/Movie";

export default function AppBarMain() {
  return (
    <Box>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <MovieIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            MovieMatrix
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
