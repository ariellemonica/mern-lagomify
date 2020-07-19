import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
import { Main } from '../components';
import API from '../utils/API';

class ItemAdd extends React.Component {
  //   constructor(props) {
  //         super(props);

  //         this.state = {
  //             user: null,
  //             name: '',
  //             description: '',
  //             location: ''
  //         };
  //     }

  // componentDidUpdate(prevProps) {
  //     if (prevProps.user !== this.props.user) {
  //         // they are probably logged in
  //         console.log('they are probably logged in');
  //         this.setState({
  //             user: this.props.user
  //         });
  //     }
  // }
  // const useStyles = makeStyles(() => ({
  //     stretch: {
  //         display: 'flex',
  //         justifyContent: 'space-around'
  //     }
  // }));
    state = {
      name: '',
      description: '',
      location: ''
    };

    handleTextChange = (event) => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    }

    // mn - next step - find out why it's not getting to db
    handleButtonClick = (event) => {
      event.preventDefault();
      console.log('the current state: ' + this.state.name);
      API.addItem({
        name: this.state.name,
        description: this.state.description,
        location: this.state.location
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
            <Button variant="contained" color="primary" onClick={this.handleButtonClick}>Add Item</Button>
          </form>
        </Main>
      );
    }
}

export default ItemAdd;
