import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Button, FormControl, FormHelperText, TextField
} from '@material-ui/core';
import clsx from 'clsx';
import { Main } from '../components';
import API from '../utils/API';

const useStyles = makeStyles(theme => ({
  media: {
    borderRadius: 4,
    height: '100%',
    maxHeight: '50vh',
    minWidth: '50vh'
  },
  emphasis: {
    fontWeight: 'bold'
  },
  spaceAround: {
    margin: 'auto 1rem'
  },
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

const ItemDetails = (props) => {
  const [_id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editMode, setEditMode] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const { match: { params } } = props;

    getItemDetails(params);
  }, [props,
    _id, name, description, location, status, imageUrl,
    editMode]);

  const getItemDetails = async ({ id }) => {
    try {
      const { _id, name, description, location, status, imageUrl } =
        await API.getItem(id);

      setId(_id);
      setName(name);
      setDescription(description);
      setLocation(location);
      setStatus(status);
      setImageUrl(imageUrl);
    } catch (err) {
      console.err(err.stack);
    }
  };

  const handleEditClick = () => {
    // allows user to edit the item
    setEditMode(true);
  };

  const handleDonateClick = (event) => {
    // changes status to 'toDonate'
    event.preventDefault();
    console.log('the current status: ' + status);
    console.log('the current item id: ' + _id);
    // changes status to 'toDonate'
    API.updateItem({
      _id: _id,
      name: name,
      description: description,
      location: location,
      status: 'toDonate'
    })
      .catch(err => console.log(err));

    // bring user to page for resources to donate
    window.location = '/donate';
  };

  const handleSellClick = (event) => {
    event.preventDefault();
    console.log('the current status: ' + status);
    console.log('the current item id: ' + _id);
    // changes status to 'toSell'
    API.updateItem({
      _id: _id,
      name: name,
      description: description,
      location: location,
      status: 'toSell'
    })
      .catch(err => console.log(err));

    // bring user to page for resources to sell
    window.location = '/sell';
  };

  const handleTossClick = (event) => {
    event.preventDefault();
    console.log('the current status: ' + status);
    console.log('the current item id: ' + _id);
    API.updateItem({
      _id: _id,
      name: name,
      description: description,
      location: location,
      status: 'toToss'
    })
      .catch(err => console.log(err));
  };

  const handleUpdateItem = (event) => {
    event.preventDefault();

    // API call here ...

    setEditMode(false);
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
            My Item Details
          </Typography>
        </Grid>
        <Grid item xs={12}
          className={classes.spaceBottom}>
          <img src={imageUrl} alt="name" className={classes.media} />
        </Grid>
        <Grid item xs={12}
          align="center"
          className={classes.spaceBottom}>
          { editMode
            ? <form noValidate autoComplete="off">
              <FormControl className={classes.spaceAround}>
                <TextField id="item-name"
                  label="Item Name"
                  variant="outlined" />
                <FormHelperText id="item-name-helper-text">
                  {name}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.spaceAround}>
                <TextField id="item-desc"
                  label="Item Description"
                  variant="outlined" />
                <FormHelperText id="item-desc-helper-text">
                  {description}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.spaceAround}>
                <TextField id="itemName"
                  label="Item Location"
                  variant="outlined" />
                <FormHelperText id="item-loc-helper-text">
                  {location}
                </FormHelperText>
              </FormControl>
            </form>
            : <>
              <Typography variant='h4' gutterBottom>{name}</Typography>
              <Typography variant="body1">
                <span className={classes.emphasis}>
                  Item Description:&nbsp;
                </span> {description}
              </Typography>
              <Typography variant="body1">
                <span className={classes.emphasis}>
                  Location:&nbsp;
                </span> {location}
              </Typography>
            </>
          }
        </Grid>
        { editMode
          ? <Grid item x={12}
            className={classes.spaceBottom}>
            <Button color="primary" onClick={handleUpdateItem}>
              Update Item
            </Button>
          </Grid>
          : <Grid item x={12}
            className={clsx(classes.stretch, classes.spaceBottom)}>
            <Button color='primary' onClick={handleEditClick}>
              Edit Item
            </Button>
            <Button color='default' onClick={handleDonateClick}>
              Donate
            </Button>
            <Button color='default' onClick={handleSellClick}>
              Sell
            </Button>
            <Button color='secondary' onClick={handleTossClick}>
              Toss
            </Button>
          </Grid>
        }
      </Grid>
    </Main>
  );
};

export default ItemDetails;
