import React from 'react';
import { TextField, Button } from '@material-ui/core';
import API from "../utils/API";
import FileUpload from "../components/FileUpload";

class ItemAdd extends React.Component {
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

    // mn - next step - find out why it's not getting to db
    handleButtonClick = (event) => {
        event.preventDefault();
        console.log('the current state: ' + this.state.name)
        API.addItem(this.state)
            .catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <h1>Catalog Your Item</h1>
                <form noValidate autocomplete="off">
                    <TextField name="name" value={this.state.name} label="Item Name" variant="outlined" onChange={this.handleTextChange} />
                    <TextField name="description" value={this.state.description} label="Description" variant="outlined" onChange={this.handleTextChange} />
                    <TextField name="location" value={this.state.location} label="Item's Location" variant="outlined" onChange={this.handleTextChange} />
                    <FileUpload handleState={this.handleState} />
                    <Button variant="contained" color="primary" onClick={this.handleButtonClick}>
                        Add Item</Button>
                </form>
            </>
        )
    }
}

export default ItemAdd;
