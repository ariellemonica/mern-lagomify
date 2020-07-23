import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { Main } from '../components';
import API from '../utils/API';

const ItemDetails = (props) => {
  const [_id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const { match: { params } } = props;

    console.log(JSON.stringify(params));

    try {
      const getItemDetails = async () => {
        const {
          _id, name, description, location, status, imageUrl } =
          await API.getItem(params.id);

        setId(_id);
        setName(name);
        setDescription(description);
        setLocation(location);
        setStatus(status);
        setImageUrl(imageUrl);
      };

      getItemDetails();
    } catch (err) {
      console.err(err.stack);
    }
  }, [props, _id, name, description, location, status, imageUrl]);

  const handleEditClick = (e) => {
    // allows user to edit the item
    // bring to new page?
    // or display form components on this page?
    e.preventDefault();
      console.log("this items name is " + name);
      console.log("this items description is " + description);
      console.log("this items location is " + location);
      console.log("this items id is " + _id);

      API.updateItem({
        _id: _id,
        name: "d91",
        description: "dedd",
        location: "new locatrwerewrion"
      })
      .catch(err => console.log(err));
      
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
    //window.location = '/donate';
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
    //window.location = '/sell';
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

  return (
    <Main>
      <Typography variant='h2'>Item Details</Typography>
      <div><img src={imageUrl} alt="name" /></div>
      <Typography variant='h5'>{name}</Typography>
      <p>Item Description: {description}</p>
      <p>Location: {location}</p>
      <Button variant='contained' color='primary' onClick={handleEditClick}>Edit Item</Button>
      <Button variant='contained' color='primary'onClick={handleDonateClick}>Donate</Button>
      <Button variant='contained' color='primary' onClick={handleSellClick}>Sell</Button>
      <Button variant='contained' color='primary'onClick={handleTossClick}>Toss</Button>
    </Main>
  );
};

export default ItemDetails;
