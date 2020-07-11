import React from "react";
import { DropzoneArea } from 'material-ui-dropzone';

class FileUpload extends React.Component {
    render() {
        return (
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an image here or click"}
            onChange={(files) => console.log('Files:', files)}
          />
        )
    }
}



export default FileUpload;