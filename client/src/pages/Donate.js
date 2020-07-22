import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Main, PlaceCard } from '../components';
import API from '../utils/API';

const useStyles = makeStyles((theme) => ({
  gapBottom: {
    marginBottom: '2rem'
  },
  spaceBottom: {
    marginBottom: '1rem'
  },
  spaceTop: {
    marginTop: '2rem'
  },
  stretch: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}));

const Donate = () => {
  const [places, setPlaces] = useState([]);
  const classes = useStyles();

  console.log('Donate');

  useEffect(() => {
    console.log("hi, there");
    API.getPlaces('donate')
      .then(resp => resp.json())
      .then(data => setPlaces(data))
      .catch(err => console.error(err.stack));
  }, []);

  return (
    <Main>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h2"
            align="center"
            gutterBottom
            className={classes.spaceTop}>
            Donate
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1"
            className={classes.spaceBottom}>
            The following organizations will accept donations of used items in good condition. Please contact the particular organization you are interested in donating to for any restrictions.
          </Typography>
        </Grid>
        { places.length ? (
          places.map(place => (
            <Grid item
              key={place._id}
              xs={6}
              className={clsx(classes.stretch, classes.gapBottom)}>
              <PlaceCard
                name={place.name}
                link={place.link}
                logo={place.logo}
                alt={place.name}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">
              There are no donation centers in our database at this time. Please check back later.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Main>
  );
};

export default Donate;
