// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { Main, CarouselItem } from '../components';
import API from '../utils/API';

const useStyles = makeStyles(theme => ({
  spaceBottom: {
    marginBottom: '1rem'
  },
  stretch: {
    display: 'flex',
    direction: 'row',
    justifyContent: 'space-between',
    width: '50vh'
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
  const [myItems, setMyItems] = useState(initState);
  const classes = useStyles();

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    const fetchItems = async () => {
      await API.getMyItems()
        .then(resp => resp.json())
        .then(data => setMyItems(data))
        .catch(err => console.error(err.stack));
    };

    fetchItems();
  };

  return (
    <Main>
      <Grid container
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom>View My Stuff</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" className={classes.spaceBottom}>
            Browse your stuff below. Keep what brings you joy. Let go of what does not.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Carousel
            autoPlay={false} className={classes.spaceBottom}>
            {
              myItems.map(item =>
                <CarouselItem key={item._id} item={item} />)
            }
          </Carousel>
        </Grid>
        <Grid item xs={12} className={classes.stretch}>
          <Button>This Item Brings Me Joy</Button>
          <Button color="secondary">This Item Does Not</Button>
        </Grid>
      </Grid>
    </Main>
  );
};

export default ViewMyStuff;
