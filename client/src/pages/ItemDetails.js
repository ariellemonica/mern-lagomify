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

    render() {
        return (
            <>
                <h1>Item Details</h1>
                <div>DEFAULT IMAGE HERE</div>
                <p>Item Name: {this.state.name}</p>
                <p>Item Description: {this.state.description}</p>
                <p>Location: {this.state.location}</p>
                <Button variant='contained' color='primary'>Donate</Button>
                <Button variant='contained' color='primary'>Sell</Button>
                <Button variant='contained' color='primary'>Toss</Button>
            </>
        )
    }

}

export default ItemDetails;