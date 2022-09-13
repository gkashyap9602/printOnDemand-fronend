import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  Container,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Image from "next/image";

import HeaderLogo from "/static/images/MWW-Logo.png";
import style from "./style";

const useStyles = style;

const DesignerBar = () => {
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div className={classes.header_Wrapper}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters className={classes.toolbar_Wrapper}>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="default"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              ></Menu>
            </Box>
            <div>
              <Image
                src={HeaderLogo}
                alt="Logo"
                // width={285}
                // height={29}
              />
            </div>
            <Avatar />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default DesignerBar;
