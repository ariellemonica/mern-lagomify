// import React, { useState } from 'react';
import React, { useEffect, useRef, useState } from 'react';
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
  const [myItems, setMyItems] = useState([]);
  const [caroIndex, setCaroIndex] = useState(0);
  const caro = useRef();
  const classes = useStyles();

  useEffect(() => {
    handleFetch();
  }, []);

  const handleActionClick = (action) => {
    return async (ev) => {
      ev.preventDefault();

      const { _id } = myItems[caroIndex];

      try {
        const resp = await API.updateMyItems({ _id, action });
        const data = await resp.json();
        if (data.updated) {
          if (caroIndex + 1 === myItems.length) {
            caro.current.prev();
          }
          handleFetch();
        } else {
          caro.current.next();
          console.log('Nothing updated.');
        }
      } catch (err) {
        console.error(err.stack);
      }
    };
  };

  const handleCarouselChange = (index) => {
    setCaroIndex(index);
  };

  const handleFetch = async () => {
    try {
      const resp = await API.getMyItems();
      const data = await resp.json();

      setMyItems(data);
    } catch (err) {
      console.error(err.stack);
    }
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
          {myItems.length
            ? <Carousel
              className={classes.spaceBottom}
              autoPlay={false}
              onChange={handleCarouselChange}
              ref={caro}>
              {
                myItems.map((item) =>
                  <CarouselItem
                    key={item._id}
                    item={item}
                  />)
              }
            </Carousel>
            : null}
        </Grid>
        <Grid item
          xs={12}
          className={clsx(classes.stretch, classes.spaceBottom)}>
          <Button color="default"
            onClick={handleActionClick(true)}>
            This Item Brings Me Joy
          </Button>
          <Button color="secondary"
            onClick={handleActionClick(false)}>
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
