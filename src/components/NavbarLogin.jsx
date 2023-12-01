import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ModalM from "./Modal.jsx";

export default function NavbarLogin({ content }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AutoManage
          </Typography>
            <ModalM
              titleModalButton="Login"
              titleModal="Login Automanage"
              content={content}
            >Login</ModalM>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
