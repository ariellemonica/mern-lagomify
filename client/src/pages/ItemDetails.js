import React from "react";
import { Button } from '@material-ui/core';
// import API from "../utils/API";

class ItemDetails extends React.Component {
    state = {
        name: '',
        description: '',
        location: '',
        status: ''
    };


    render() {
        return (
            <>
                <h1>Item Details</h1>
                <p>Placeholder Item Name</p>
                <p>Placeholder Item Description</p>
                <Button variant='contained' color='primary'>Donate</Button>
                <Button variant='contained' color='primary'>Sell</Button>
                <Button variant='contained' color='primary'>Toss</Button>
            </>
        )
    }

}

export default ItemDetails;