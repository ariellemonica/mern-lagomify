import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { Main, ResourceCard } from '../components';
import API from '../utils/API';

const useStyles = makeStyles((theme) => ({
  stretch: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}));

const LearnMore = () => {
  const [resources, setResources] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    API.getResources()
      .then((resp) => resp.json())
      .then((data) => setResources(data))
      .catch(err => console.error(err.stack));
  }, []);

  return (
    <Main>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2">Learn More</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            The following resources offer more information regarding minimalism and simplifying your life. Peruse them to find out how to make room in your life for what really matters.
          </Typography>
        </Grid>
        { resources.length ? (
          resources.map(resource => (
            <Grid item key={resource.id} xs={6} className={classes.stretch}>
              <ResourceCard
                key={resource.id}
                title={resource.title}
                link={resource.link}
                img={resource.image}
                alt={resource.alt}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">
              There are no external resources available at this time. Please check back later.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Main>
  );
};

export default LearnMore;
