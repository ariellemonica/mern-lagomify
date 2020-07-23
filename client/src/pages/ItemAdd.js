import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Button, FormControl, FormHelperText, TextField
} from '@material-ui/core';
import clsx from 'clsx';
import axios from 'axios';
import { Main, FileUpload } from '../components';

const useStyles = makeStyles(theme => ({
  centered: {
    textAlign: 'center'
  },
  spaceAround: {
    margin: 'auto 0.5rem'
  },
  spaceBottom: {
    marginBottom: '1rem'
  },
  spaceTop: {
    marginTop: '2rem'
  },
  lessSpaceTop: {
    marginTop: '1rem'
  },
  firstChild: {
    marginLeft: 0
  },
  lastChild: {
    marginRight: 0
  }
}));

const ItemAdd = ({ user: { sub, email } }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState(null);
  const [createdBy, setCreatedBy] = useState('');
  const [owner, setOwner] = useState('');
  const [location, setLocation] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setCreatedBy(sub);
    setOwner(email);
  }, [sub, email]);

  const handleTextChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'location':
        setLocation(value);
        break;
      default:
        // Do nothing!
    }
  };

  const handleState = ({
    name, description, files, createdBy, owner, location
  }) => {
    setName(name);
    setDescription(description);
    setFiles(files);
    setLocation(location);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();

    const data = new FormData();
    const state = {
      name: name,
      description: description,
      files: files,
      createdBy: createdBy || '',
      owner: owner || '',
      location: location
    };

    data.append('image', files[0]);
    data.append('text', JSON.stringify(state));

    axios.post('api/item', data).then(() => {
      window.location = '/view';
    });
  };

  return (
    <Main>
      <Grid container
        direction="column"
        justify="space-between"
        alignItems="center">
        <Grid item xs={12}>
          <Typography variant='h2'
            gutterBottom
            className={classes.spaceTop}>
            Add My Item
          </Typography>
        </Grid>
        <Grid item xs={12}
          className={classes.spaceBottom}>
          <Typography variant="body1"
            align="justify">
              Add your item to your collection below. Once your item is added to your collection, you can decide if item brings you joy not. If it does not, then you can determine if you want to sell it, donate, or toss it.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <FormControl className={clsx(
              classes.spaceAround,
              classes.spaceBottom,
              classes.firstChild)}>
              <TextField id="item-name"
                name="name"
                label="Item Name"
                variant="outlined"
                onChange={handleTextChange} />
              <FormHelperText id="item-name-helper-text">
                the name of your item
              </FormHelperText>
            </FormControl>
            <FormControl className={clsx(
              classes.spaceAround,
              classes.spaceBottom)}>
              <TextField name="description"
                label="Item Description"
                variant="outlined"
                onChange={handleTextChange} />
              <FormHelperText id="item-desc-helper-text">
                a brief description of your item
              </FormHelperText>
            </FormControl>
            <FormControl className={clsx(
              classes.spaceAround,
              classes.spaceBottom,
              classes.lastChild)}>
              <TextField name="location"
                label="Item Location"
                variant="outlined"
                onChange={handleTextChange} />
              <FormHelperText id="item-loc-helper-text">
                the room this item occupies
              </FormHelperText>
            </FormControl>
            <FileUpload handleState={handleState} />
            <div className={clsx(
              classes.centered,
              classes.lessSpaceTop)}>
              <Button color="primary"
                onClick={handleButtonClick}>
                Add My Item
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Main>
  );
};

export default ItemAdd;
