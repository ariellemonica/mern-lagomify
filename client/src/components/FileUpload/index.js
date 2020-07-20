import React from "react";
import { DropzoneArea } from 'material-ui-dropzone';
//import { DropzoneDialog } from 'material-ui-dropzone';
//import Button from '@material-ui/core/Button';
// const [open, setOpen] = React.useState(false);

const axios = require('axios');


class FileUpload extends React.Component {
  constructor() {
    super();

    this.state = {
      file: []
    };
  }
      
  handleChange = (files) => {
    console.log('Files:', files);
    this.setState({
      files
    });
  };

  render() { 
    return (
      <>
      <DropzoneArea
        acceptedFiles={['image/*']}
        dropzoneText={"Drag and drop an image here or click"} 
        onChange={(files) => {  
          this.props.handleState({ files: files })
        }}
      />
      </>
      );
  }
};

export default FileUpload;