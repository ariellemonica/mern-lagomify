import React from "react";
import { DropzoneArea } from 'material-ui-dropzone';

const upload = require('superagent');

class FileUpload extends React.Component {
      onDrop: function (files) {
        upload.post('/upload')
        .attach('theseNamesMustMatch', files[0])
        .end(( err, res) => {
          if (err) console.log (err);
          alert('File uploaded!')
        })
      }

      render() { 
        return (
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an image here or click"}
            onChange={(files) => console.log('Files:', files)}
            onDrop={this.onDrop}
          />
        );
    }
};

export default FileUpload;