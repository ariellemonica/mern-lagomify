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

    // handleSubmit = (e, files) => {
    //     e.preventDefault();
    
    //     const data = new FormData();
    //     data.append('file', this.state.files[0]);
    
    //     axios.post('imageUpload/upload', data, {
    //       body: files
    //     }).then(() => {
    //       console.log('request happened');
    //     });
    //   };

    handleState = (obj) => {
        this.setState(obj);
    };

    // mn - next step - find out why it's not getting to db
    handleButtonClick = (event) => {
        event.preventDefault();

        console.log(this.state.files[0]);
    
        const data = new FormData();
        data.append('file', this.state.files[0]);
        data.append('text', this.state);

        API.addItem(data);
    
        // axios.post('api/item', data, {
        //   body: JSON.stringify(this.state)
        // }).then(() => {
        //   console.log('request happened');
        // });

        // console.log('the current state: ' + this.state.name)
        // API.addItem(this.state)
        //     .catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <h1>Catalog Your Item</h1>
                <form noValidate autocomplete="off">
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
            </>
        )
    }
}

export default ItemAdd;
