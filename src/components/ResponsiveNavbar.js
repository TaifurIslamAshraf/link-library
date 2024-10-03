"use client"; // Ensure this is at the top

import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


const ResponsiveNavbar = ({ onCategoryChange, categories }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleCategoryClick = (category) => {
    onCategoryChange(category); // Call the parent function to change the table data
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#eeeeee" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black" }}>
            Link Library
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryClick(category)}
                sx={{ color: "black" }} // Set button text color to black
              >
                {category}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {categories.map((category) => (
              <ListItem button key={category} onClick={() => handleCategoryClick(category)}>
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default ResponsiveNavbar;
