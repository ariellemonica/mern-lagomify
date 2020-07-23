import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card, CardActions, CardActionArea, CardContent, CardMedia,
  Typography
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 360,
    position: 'relative',
    width: '100%'
  },
  media: {
    height: '100%',
    minHeight: 180
  },
  actArea: {
    marginBottom: '2rem',
    focusHighlight: { backgroundColor: 'transparent', opacity: 100 }
  },
  btn: {
    bottom: 8,
    position: 'absolute'
  }
});

const PlaceCard = (props) => {
  const classes = useStyles();

  return (
    <Card id={props.id} className={classes.root}>
      <CardActionArea disableRipple={true} className={classes.actArea}>
        <CardMedia
          className={classes.media}
          name={props.name}
          image={props.logo}
          alt={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" className={classes.btn} href={props.link}>
          <LinkIcon fontSize="small" />&nbsp;Visit {props.name}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceCard;
