import React from "react";
import { DropzoneArea } from 'material-ui-dropzone';
const axios = require('axios');


class FileUpload extends React.Component {

      // onDrop = (files) => {
      //   upload.post('/upload')
      //   .attach('theseNamesMustMatch', files[0])
      //   .end(( err, res) => {
      //     if (err) console.log (err);
      //     alert('File uploaded!')
      //   })
      // };

      handleSubmit = (e, files) => {
        e.preventDefault();

        axios.post('imageUpload/upload', {
          body: files
        }).then(() => {
          console.log('request happened');
        });
      };

      render() { 
        return (
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an image here or click"}
            onChange={(files) => console.log('Files:', files)}
            onDrop={this.onDrop}
            onSubmit={this.handleSubmit}
          />
        );
    }
};

export default FileUpload;