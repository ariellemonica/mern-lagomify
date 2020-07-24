import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Button, FormControl, FormHelperText, TextField
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// import InfoIcon from '@material-ui/icons/Info';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import UpdateIcon from '@material-ui/icons/Update';
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
  contract: {
    display: 'flex',
    direction: 'row',
    justifyContent: 'space-around',
    width: '50vh'
  },
  stretch: {
    display: 'flex',
    direction: 'row',
    justifyContent: 'space-between',
    width: '60vh'
  }
}));

const initFormData = Object.freeze({
  name: '',
  description: '',
  location: ''
});

const ItemDetails = (props) => {
  const [_id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initFormData);
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

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value.trim()
    });
  };

  const handleEditClick = (event) => {
    // allows user to edit the item
    event.preventDefault();

    setEditMode(true);
  };

  const handleDonateClick = (event) => {
    event.preventDefault();

    // DEBUG:
    // console.log('the current status: ' + status);
    // console.log('the current item id: ' + _id);

    // changes status to 'toDonate'
    API.updateItem({
      _id: _id,
      name: name,
      description: description,
      location: location,
      status: 'toDonate'
    })
      // bring user to page for resources to donate
      .then(() => { window.location = '/donate'; })
      .catch(err => console.error(err.stack));
  };

  const handleSellClick = (event) => {
    event.preventDefault();

    // DEBUG:
    // console.log('the current status: ' + status);
    // console.log('the current item id: ' + _id);

    // changes status to 'toSell'
    API.updateItem({
      _id: _id,
      name: name,
      description: description,
      location: location,
      status: 'toSell'
    })
      // bring user to page for resources to sell
      .then(() => { window.location = '/sell'; })
      .catch(err => console.error(err.stack));
  };

  const handleTossClick = (event) => {
    event.preventDefault();

    // DEBUG:
    // console.log('the current status: ' + status);
    // console.log('the current item id: ' + _id);

    // changes status to 'toToss'
    API.updateItem({
      _id: _id,
      name: name,
      description: description,
      location: location,
      status: 'toToss'
    })
      // bring user to page for viewing items
      .then(() => { window.location = '/view'; })
      .catch(err => console.error(err.stack));
  };

  const handleUpdateItem = (event) => {
    event.preventDefault();

    const { name, description, location } = formData;

    API.updateItem({
      _id: _id,
      name: name,
      description: description,
      location: location,
      status: 'keep'
    })
      .catch(err => console.error(err.stack));

    setEditMode(false);
  };

  const handleCancelEdit = (event) => {
    event.preventDefault();

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
            ? <form noValidate
              autoComplete="off"
              onSubmit={handleUpdateItem}>
              <FormControl className={classes.spaceAround}>
                <TextField id="item-name"
                  name="name"
                  label="Item Name"
                  variant="outlined"
                  onChange={handleFormInputChange} />
                <FormHelperText id="item-name-helper-text">
                  {name}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.spaceAround}>
                <TextField id="item-desc"
                  name="description"
                  label="Item Description"
                  variant="outlined"
                  onChange={handleFormInputChange}/>
                <FormHelperText id="item-desc-helper-text">
                  {description}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.spaceAround}>
                <TextField id="itemName"
                  name="location"
                  label="Item Location"
                  variant="outlined"
                  onChange={handleFormInputChange}/>
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
            className={clsx(classes.contract, classes.spaceBottom)}>
            <Button variant="contained"
              color="primary"
              startIcon={<UpdateIcon />}
              onClick={handleUpdateItem}>
              Update Item
            </Button>
            <Button variant="contained"
              color="secondary"
              startIcon={<CancelIcon />}
              onClick={handleCancelEdit}>
              Cancel Edit
            </Button>
          </Grid>
          : <Grid item x={12}
            className={clsx(classes.stretch, classes.spaceBottom)}>
            <Button variant="contained"
              color='primary'
              startIcon={<EditIcon />}
              onClick={handleEditClick}>
              Edit Item
            </Button>
            <Button variant="contained"
              color='default'
              startIcon={<LoyaltyIcon />}
              onClick={handleDonateClick}>
              Donate
            </Button>
            <Button variant="contained"
              color='default'
              startIcon={<LocalOfferIcon />}
              onClick={handleSellClick}>
              Sell
            </Button>
            <Button variant="contained"
              color='secondary'
              startIcon={<DeleteIcon />}
              onClick={handleTossClick}>
              Toss
            </Button>
          </Grid>
        }
      </Grid>
    </Main>
  );
};

export default ItemDetails;
