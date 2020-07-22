import React from 'react';
// import { authContext } from '../utils/appContext';
// import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
import { Main } from '../components';
import API from '../utils/API';

class ItemAdd extends React.Component {
    state = {
      name: '',
      description: '',
      createdBy: '',
      owner: '',
      location: ''
    };

    componentDidMount = () => {
      // use this to capture current user id
      console.log('user: ', this.props);
      this.setState({
        createdBy: this.props.user.sub,
        owner: this.props.user.email
      });
    }

    handleTextChange = (event) => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    }

    handleButtonClick = (event) => {
      event.preventDefault();
      console.log('the current state: ' + this.state.name);
      API.addItem({
        name: this.state.name,
        description: this.state.description,
        location: this.state.location,
        owner: this.state.owner,
        createdBy: this.state.createdBy
      })
        .catch(err => console.log(err));
    }

    render () {
      return (
        <Main>
          <Typography variant='h2'>Catalog Your Item</Typography>
          <form noValidate autoComplete="off">
            <TextField name="name" value={this.state.name} label="Item Name" variant="outlined" onChange={this.handleTextChange} />
            <TextField name="description" value={this.state.description} label="Description" variant="outlined" onChange={this.handleTextChange} />
            <TextField name="location" value={this.state.location} label="Item's Location" variant="outlined" onChange={this.handleTextChange} />
            <Button variant="contained" color="primary" onClick={this.handleButtonClick}>
                        Add Item</Button>
          </form>
        </Main>
      );
    }
}

export default ItemAdd;
