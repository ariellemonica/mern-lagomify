import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { Main, ResourceCard } from '../components';
import resources from '../data/resources.json';

const useStyles = makeStyles((theme) => ({
  stretch: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}));

export default function LearnMore () {
  const classes = useStyles();

  const extResources = resources.map(resource =>
    <Grid item key={resource.id} xs={6} className={classes.stretch}>
      <ResourceCard
        id={resource.id}
        title={resource.title}
        link={resource.link}
        img={resource.image}
        alt={resource.alt}
      />
    </Grid>
  );

  return (
    <Main>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2">Learn More</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">The following resources offer more information regarding minimalism and simplifying your life. Peruse them to find out how to make room in your life for what really matters.</Typography>
        </Grid>
        {extResources}
      </Grid>
    </Main>
  );
}
