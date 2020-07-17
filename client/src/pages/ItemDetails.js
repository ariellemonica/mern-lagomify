import React from "react";
import { Button } from '@material-ui/core';
import API from "../utils/API";

class ItemDetails extends React.Component {
    state = {
        _id: '',
        name: '',
        description: '',
        location: '',
        status: '',
        imageUrl: ''
    };

    async componentDidMount() {
        const { match: { params } } = this.props;
        const { _id, name, description, location, status, imageUrl } = await API.getItem(params.id);
        this.setState({ _id, name, description, location, status, imageUrl });
    }

    handleEditClick () {
        // allows user to edit the item
        // bring to new page?
        // or display form components on this page?
    }

    handleDonateClick = (event) => {
        // changes status to 'toDonate'
        event.preventDefault();
        console.log('the current status: ' + this.state.status);
        console.log('the current item id: ' + this.state._id);
        // changes status to 'toSell'
        API.updateItem({
            _id: this.state._id,
            name: this.state.name,
            description: this.state.description,
            location: this.state.location,
            status: 'toDonate'
        })
        .catch(err => console.log(err));
        // bring user to page for resources to donate
    }

    handleSellClick = (event) => {
        event.preventDefault();
        console.log('the current status: ' + this.state.status);
        console.log('the current item id: ' + this.state._id);
        // changes status to 'toSell'
        API.updateItem({
            _id: this.state._id,
            name: this.state.name,
            description: this.state.description,
            location: this.state.location,
            status: 'toSell'
        })
        .catch(err => console.log(err));
        // bring user to page for resources to sell
    }

    handleTossClick = (event) => {
        event.preventDefault();
        console.log('the current status: ' + this.state.status);
        console.log('the current item id: ' + this.state._id);
        API.updateItem({
            _id: this.state._id,
            name: this.state.name,
            description: this.state.description,
            location: this.state.location,
            status: 'toToss'
        })
        .catch(err => console.log(err));
    }


    render() {
        return (
            <>
                <h1>Item Details</h1>
                <div>PLACEHOLDER IMAGE HERE</div>
                <p>Item Name: {this.state.name}</p>
                <p>Item Description: {this.state.description}</p>
                <p>Location: {this.state.location}</p>
                <Button variant='contained' color='primary' onClick={this.handleEditClick}>Edit Item</Button>
                <Button variant='contained' color='primary'onClick={this.handleDonateClick}>Donate</Button>
                <Button variant='contained' color='primary' onClick={this.handleSellClick}>Sell</Button>
                <Button variant='contained' color='primary'onClick={this.handleTossClick}>Toss</Button>
            </>
        )
    }

}

export default ItemDetails;