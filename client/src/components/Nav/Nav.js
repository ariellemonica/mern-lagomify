import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Button, ButtonGroup, IconButton, ListItemIcon, Menu, MenuItem,
  Toolbar, Typography
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import { authContext } from '../../utils/appContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  media: {
    borderRadius: 2,
    margin: '5px 15px 5px 0',
    maxHeight: '50px'
  },
  hoverButton: {
    '&:hover': {
      color: '#d29291'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  lessLeftSpacing: {
    marginLeft: -20
  }
}));

const ButtonAppBar = () => {
  const { user } = useContext(authContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear('google_token');
    window.location.replace('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#000' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
            { user
              ? <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit"
                  className={classes.lessLeftSpacing}>Logout</Typography>
              </MenuItem>
              : <MenuItem disabled>Logout</MenuItem>
            }
          </Menu>
          <img
            src="../assets/img/logos/lagomify.png"
            alt="Lagomify Logo"
            className={classes.media} />
          <Typography variant="h4" className={classes.title}>
              Lagomify
          </Typography>
          <ButtonGroup variant="text"
            aria-label="navigation menu">
            <Button color="inherit" href="/"
              className={classes.hoverButton}
              startIcon={<HomeIcon />}>Home</Button>
            <Button color="inherit" href="/view"
              className={classes.hoverButton}>My Items</Button>
            <Button color="inherit" href="/member"
              className={classes.hoverButton}>Add Item</Button>
            <Button color="inherit" href="/learn"
              className={classes.hoverButton}>Learn More</Button>
          </ButtonGroup>
          {/* user ? <Button onClick={handleLogout} color="inherit" href="#">Log Out</Button> : "" */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ButtonAppBar;
