import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {
  Card, CardActionArea, CardMedia, Typography
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  media: {
    minHeight: '50vh',
    minWidth: '50vh'
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

  return (
    <Card>
      <CardActionArea
        component={RouterLink}
        to={`/api/item/${props.item._id}`}>
        <CardMedia
          id={props.item._id}
          image={props.item.image}
          // src={props.item.imageUrl}
          title={props.item.name}
          className={classes.media}
        >
          <Typography variant="caption"
            className={classes.caption}
          >
            {props.item.name}
          </Typography>
        </CardMedia>
      </CardActionArea>
    </Card>
  );
};

export default CarouselItem;
