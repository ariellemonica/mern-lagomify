import React from "react";
import { Button } from '@material-ui/core';
import API from "../utils/API";

class ItemDetails extends React.Component {
    state = {
        name: '',
        description: '',
        location: '',
        status: '',
        imageUrl: ''
    };

    async componentDidMount() {
        const { match: { params } } = this.props;
        const { name, description, location, status, imageUrl } = await API.getItem(params.id);
        this.setState({ name, description, location, status, imageUrl });
    }

    handleEditClick () {
        // allows user to edit the item
        // bring to new page?
        // or display form components on this page?
    }

    handleDonateClick () {
        // changes status to 'toDonate'
        // bring user to page for resources to donate
    }

    handleSellClick () {
        // changes status to 'toSell'
        // bring user to page for resources to sell
    }

    handleTossClick () {
        // changes status to 'toToss'
        // brings user to page for resources to toss
    }


    render() {
        return (
            <>
                <h1>Item Details</h1>
                <div>DEFAULT IMAGE HERE</div>
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