import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PublicIcon from '@mui/icons-material/Public';
import HomeIcon from '@mui/icons-material/Home'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Header = () => {
  const [darkMode,setDarkMode] = React.useState(false);
  const { favorite } = useSelector((state:any)=>state.favorite);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            COUNTRY
          </Typography>

          <MenuItem>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <HomeIcon />
              <Link to="/"/>
            </IconButton>
          </MenuItem>
          
          <MenuItem>
            <IconButton
              size="large"
              aria-label="change me"
              color="inherit">
                <PublicIcon />
            </IconButton>
          </MenuItem>

          <MenuItem>
            <IconButton
              size="large"
              aria-label="change me"
              color="inherit">
              <Badge badgeContent={favorite.filter((f:boolean) => f && f === true).length} color="error">
                <FavoriteIcon />
              </Badge>
              
            </IconButton>
          </MenuItem>

          <MenuItem onClick={()=> darkMode ? setDarkMode(false) : setDarkMode(true)}>
            <IconButton
              size="large"
              aria-label="change me"
              color="inherit">
              {darkMode ? <ToggleOnIcon /> : <ToggleOffIcon />}
            </IconButton>
          </MenuItem>

        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header