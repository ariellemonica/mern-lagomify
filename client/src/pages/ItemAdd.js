import React from 'react';
import API from "../utils/API";
import FileUpload from "../components/FileUpload";
import axios from 'axios';
// import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
import { Main } from '../components';


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
      location: '',
      files: null
    };

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
    
        axios.post('api/item', data).then(() => {
          console.log('request happened');
          // window.location = 'someOtherPage'
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
