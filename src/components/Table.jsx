import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function BasicTable({ data, titles }) {
  /**
   * Renders a table based on the provided data and titles.
   *
   * @param {Array} data - An array of objects representing the rows of the table.
   * @param {Array} titles - An array of strings representing the titles of the table columns.
   * @returns {JSX.Element} - The rendered table.
   */
  return (
    <TableContainer className="dark:bg-black">
      <Table className="outline-white" aria-label="simple table">
        <TableHead>
          <TableRow>
            {titles.map((title) => (
              <TableCell
                className="dark:text-white"
                key={title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {titles.map((title) => (
                <TableCell
                  align="left"
                  key={title}
                  className="text-black dark:text-white"
                >
                  {row[title.toLowerCase()]}{" "}
                  {/* Use the title to access the corresponding data */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
