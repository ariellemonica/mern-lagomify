import React from "react";
import { DropzoneArea } from 'material-ui-dropzone';

function useS3Upload({
  presignedUploadUrl,
  onUploadReady,
  onError,
}) {
  async function handleDrop([pendingImage]) {
    // Upload the image to our pre-signed URL.
    const response = await fetch(
      new Request(presignedUploadUrl, {
        method: 'PUT',
        body: pendingImage,
        headers: new Headers({
          'Content-Type': 'image/*',
        }),
      }),
    );
    if (response.status !== 200) {
      // The upload failed, so let's notify the caller.
      onError();
      return;
    }
    // Let the caller know that the upload is done, so that it can send the URL
    // to the backend again, persisting it to the database.
    onUploadReady();

    //create image record
    //array
    //associated images with item 
  }

  return useDropzone({
    accept: 'image/*',
    disabled: typeof presignedUploadUrl !== 'string',
    handleDrop,
  });
}

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