import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {
  Card, CardActionArea, CardMedia, Typography
} from '@material-ui/core';
// import { Paper, Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 360
  },
  media: {
    height: 360
  },
  caption: {
    backgroundColor: fade('#000', 0.3),
    bottom: 0,
    color: '#fff',
    fontSize: '1.5rem',
    height: '3rem',
    lineHeight: '3rem',
    opacity: 1,
    position: 'absolute',
    textAlign: 'center',
    width: '100%'
  }
});

const CarouselItem = (props) => {
  const classes = useStyles();

  /* return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">
          Check it out!
      </Button>
    </Paper>
  ); */

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.item.image}
          title={props.item.name}
        >
          <Typography variant="caption" className={classes.caption}>{props.item.name}</Typography>
        </CardMedia>
      </CardActionArea>
    </Card>
  );
};

export default CarouselItem;
