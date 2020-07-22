import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { authContext } from '../../utils/appContext';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }

}));

export default function ButtonAppBar () {
  const classes = useStyles();
  const { user } = useContext(authContext);

  const handleLogout = () => {
    localStorage.clear("google_token");
    window.location.replace("/")
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        {user ? <MenuItem onClick={handleLogout}>Logout</MenuItem> : ""}
      </Menu>
          <Typography variant="h6" className={classes.title}>
              Lagomify
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/view">My Items</Button>
          <Button color="inherit" href="/member">Add Item</Button>
          <Button color="inherit" href="/learn">Learn More</Button>
          {/*user ? <Button onClick={handleLogout} color="inherit" href="#">Log Out</Button> : ""*/}
        </Toolbar>
      </AppBar>
    </div>
  );
}
