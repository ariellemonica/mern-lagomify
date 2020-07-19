// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { Main, CarouselItem } from '../components';
import API from '../utils/API';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  stretch: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const ViewMyStuff = () => {
  // It's necessary to set the initial state with one item so
  // the carousel will render properly on page load.
  const initState = [{
    id: 0,
    name: 'Welcome',
    image: '..assets/img/green-wooden-chair.jpg'
  }];
  const [items4Sale, setItems4Sale] = useState(initState);
  const classes = useStyles();

  useEffect(() => {
    const fetchItems = async () => {
      await API.getMyItems()
        .then(resp => resp.json())
        .then(async data => await setItems4Sale(data))
        .catch(err => console.error(err.stack));
    };

    fetchItems();
  }, []);

  return (
    <Main>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h2">View Stuff</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">Rooms</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">My Stuff</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">&nbsp;</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Browse your stuff below. Keep what brings you joy, and let go of what doesn't.</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">&nbsp;</Typography>
        </Grid>
        <Grid item xs={6}>
          <Carousel autoPlay={false}>
            {
              items4Sale.map(item =>
                <CarouselItem key={item._id} item={item} />)
            }
          </Carousel>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">&nbsp;</Typography>
        </Grid>
        <Grid item xs={6} className={classes.stretch}>
          <Button color="secondary">This Item Doesn't</Button>
          <Button>This Item Brings Me Joy</Button>
        </Grid>
      </Grid>
    </Main>
  );
};

export default ViewMyStuff;
