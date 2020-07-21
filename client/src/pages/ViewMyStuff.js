// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import clsx from 'clsx';
import { Main, CarouselItem } from '../components';
import API from '../utils/API';
// you will need to import context and get user details from that
// then use an api call to get the data

const useStyles = makeStyles(theme => ({
  spaceBottom: {
    marginBottom: '1rem'
  },
  spaceTop: {
    marginTop: '2rem'
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
  const [dataLoaded, setDataLoaded] = useState(false);
  const [itemId, setItemId] = useState(initState[0].id);
  const classes = useStyles();

  useEffect(() => {
    handleFetch();
  }, []);

  const handleClickMyItems = ev => {
    ev.preventDefault();

    const {
      'data-item-id': { value: myItemId },
      'data-item-action': { value: myItemAction }
    } = ev.currentTarget.attributes;

    const myItemUpdate = {
      _id: myItemId,
      action: myItemAction
    };

    const updateItems = async () => {
      await API.updateMyItems(myItemUpdate)
        .then(resp => resp.json())
        .then(data => {
          const { updated } = data;

          (updated)
            ? handleFetch()
            : console.log('Nothing updated.');
        })
        .catch(err => console.error(err.stack));
    };

    updateItems();
  };

  const handleFetch = () => {
    const fetchItems = async () => {
      await API.getMyItems()
        .then(resp => resp.json())
        .then(data => setMyItems(data))
        .then(() => setDataLoaded(true))
        .catch(err => console.error(err.stack));
    };

    fetchItems();
  };

  return (
    <Main>
      <Grid container
        direction="column"
        justify="space-between"
        alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h2"
            gutterBottom
            className={classes.spaceTop}>
            View My Stuff
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1"
            align="center"
            className={classes.spaceBottom}>
            Browse your stuff below. Keep what brings you joy. Let go of what does not.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          { dataLoaded
            ? <Carousel
              autoPlay={false} className={classes.spaceBottom}>
              {
                myItems.map(item =>
                  <CarouselItem
                    key={Math.floor(Math.random() * Math.floor(100000))}
                    item={item}
                    itemState={{ itemId, setItemId }}
                  />)
              }
            </Carousel>
            : null }
        </Grid>
        <Grid item
          xs={12}
          className={clsx(classes.stretch, classes.spaceBottom)}>
          <Button color="default"
            data-item-id={itemId}
            data-item-action={true}
            onClick={handleClickMyItems}>
            This Item Brings Me Joy
          </Button>
          <Button color="secondary"
            data-item-id={itemId}
            data-item-action={false}
            onClick={handleClickMyItems}>
            This Item Does Not
          </Button>
        </Grid>
        <Typography variant="body2" className={classes.spaceBottom}>
            Click on a photo to view more details about the item.
        </Typography>
        <Grid item
          xs={12}
          align="center"
          className={classes.spaceBottom}>
          <Button color="primary"
            href="./member">
            Add Item
          </Button>
        </Grid>
      </Grid>
    </Main>
  );
};

export default ViewMyStuff;
