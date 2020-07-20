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

      //onDrop = (e, files) => {
        //e.preventDefault();
        //axios.post('imageUpload/upload', {
          //body: files
        //}).then(() => {
          //console.log('File Uploaded!')
        //});
        //.attach('theseNamesMustMatch', files[0])
        //.end(( err, res) => {
          //if (err) console.log (err);
          //alert('File uploaded!')
        //});
      //};
      
  handleChange = (files) => {
    console.log('Files:', files);
    this.setState({
      files
    });
  };

  // handleSubmit = (e, files) => {
  //   e.preventDefault();

  //   const data = new FormData();
  //   data.append('file', this.state.files[0]);

  //   axios.post('imageUpload/upload', data, {
  //     body: files
  //   }).then(() => {
  //     console.log('request happened');
  //   });
  // };

  render() { 
    return (
      <>
      <DropzoneArea
        acceptedFiles={['image/*']}
        dropzoneText={"Drag and drop an image here or click"}
         
        onChange={(files) => {  
          this.props.handleState({ files: files })
        }}
            // onSubmit={this.handleSubmit}
          />
          <div>
            {/* <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Add Image
            </Button> */}
        
            {/* <DropzoneDialog
              acceptedFiles={['image/*']}
              cancelButtonText={"cancel"}
              submitButtonText={"submit"}
              maxFileSize={5000000}
              open={open}
              onClose={() => setOpen(false)}
              onSave={(files) => {
                console.log('Files:', files);
                setOpen(false);
              }}
              showPreviews={true}
              showFileNamesInPreview={true}
            /> */}
          </div>
          </>
      );
  }
};

export default FileUpload;