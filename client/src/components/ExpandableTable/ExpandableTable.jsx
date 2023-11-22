import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse,
  Typography,
} from "@mui/material";

export default function ExpandableTable({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        variant="outlined"
        color="primary"
        sx={{ mt: "1rem" }}
      >
        {open ? "Hide the Cast" : "See the Cast"}
      </Button>

      <Collapse in={open} timeout="auto">
        <TableContainer component={Paper} style={{ marginTop: "1em" }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h5">Person Name</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h5">Character Name</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.person_name}
                  </TableCell>
                  <TableCell align="right">{row.character_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </>
  );
}
