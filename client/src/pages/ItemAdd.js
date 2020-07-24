import React from 'react';
import API from "../utils/API";
import FileUpload from "../components/FileUpload";
import axios from 'axios';
import { TextField, Button, Typography } from '@material-ui/core';
import { Main } from '../components';


class ItemAdd extends React.Component {
  state = {
    name: '',
    description: '',
    files: null,
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

    handleState = (obj) => {
      this.setState(obj);
    };

    handleButtonClick = (event) => {
      event.preventDefault();
    
      const data = new FormData();
      data.append('image', this.state.files[0]);
      data.append('text', JSON.stringify(this.state));
      console.log('this is the data' + data);
    
      axios.post('api/item', data).then(() => {
        console.log('request happened');
        window.location = '/view'
        console.log("this is the story of a girl" + this.state.owner);
      });
    }

    render () {
      return (
        <Main>
          <Typography variant='h2'>Catalog Your Item</Typography>
          <form noValidate autoComplete="off">
            <TextField name="name" value={this.state.name} label="Item Name" variant="outlined" onChange={this.handleTextChange} />
            <TextField name="description" value={this.state.description} label="Description" variant="outlined" onChange={this.handleTextChange} />
            <TextField name="location" value={this.state.location} label="Item's Location" variant="outlined" onChange={this.handleTextChange} />
            <FileUpload
              handleState={this.handleState}
              handleSubmit={this.handleSubmit}
            />
            <Button variant="contained" color="primary" onClick={this.handleButtonClick}>
                        Add Item</Button>
          </form>
        </Main>
      );
    }
}

export default ItemAdd;
