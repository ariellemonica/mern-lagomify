// import React, { useState } from 'react';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { Main, CarouselItem } from '../components';
// import API from '../utils/API';

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
  const classes = useStyles();

  const items = [
    {
      id: 1,
      name: 'Test Item 1',
      image: '../assets/img/green-wooden-chair.jpg',
      description: 'I\'m a random item!'
    },
    {
      id: 2,
      name: 'Test Item 2',
      image: '../assets/img/plant-in-clear-vase.jpg',
      description: 'I\'m another random item!'
    },
    {
      id: 3,
      name: 'Test Item 3',
      image: '../assets/img/assorted-clothes-on-hangers.jpg',
      description: 'I\'m another random item!'
    }
  ];

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
              items.map(item =>
                <CarouselItem item={item} key={item.id} />)
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
