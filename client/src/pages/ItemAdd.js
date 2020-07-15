import React from "react";
import { TextField, Button } from '@material-ui/core';
import API from "../utils/API";
import FileUpload from "../components/FileUpload";

class ItemAdd extends React.Component {
    state = {
        name: '',
        description: '',
        location: ''
    };

    handleTextChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    //mn - next step - find out why it's not getting to db
    handleButtonClick = (event) => {
        event.preventDefault();
        console.log('the current state: ' + this.state.name)
        API.addItem({
            name: this.state.name,
            description: this.state.description,
            location: this.state.location
        })
        // .catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <h1>Add Item Form!</h1>
                <form noValidate autocomplete="off">
                    <TextField name="name" value={this.state.name} label="Item Name" variant="outlined" onChange={this.handleTextChange} />
                    <TextField name="description" value={this.state.description} label="Description" variant="outlined" onChange={this.handleTextChange} />
                    <TextField name="location" value={this.state.location} label="Item's Location" variant="outlined" onChange={this.handleTextChange} />
                    <FileUpload {/*onUpload={this.imageUpload}*/}/>
                    <Button variant="contained" color="primary" onClick={this.handleButtonClick}>
                        Add Item</Button>
                </form>
            </>
        )
    }
}

export default ItemAdd;

