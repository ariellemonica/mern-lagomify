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
    height: 180
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

export default function ResourceCard (props) {
  const classes = useStyles();

  return (
    <Card id={props.id} className={classes.root}>
      <CardActionArea disableRipple={true} className={classes.actArea}>
        <CardMedia
          className={classes.media}
          image={props.img}
          title={props.alt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" className={classes.btn} href={props.link}>
          <LinkIcon fontSize="small" />&nbsp;Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
