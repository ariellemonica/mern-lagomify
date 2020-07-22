import React from "react";
import { DropzoneArea } from 'material-ui-dropzone';

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