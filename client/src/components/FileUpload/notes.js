// presignedUploadUrl will be a URL inside the lagomify-user-uploads S3 Bucket, in the items directory
// const presignedUploadUrl = await getPresignedUploadUrl('lagomify-user-uploads', 'items');

function useS3Upload ({
  presignedUploadUrl,
  onUploadReady,
  onError
}) {
  async function handleDrop ([pendingImage]) {
    // Upload the image to our pre-signed URL.
    const response = await fetch(
      new Request(presignedUploadUrl, {
        method: 'PUT',
        body: pendingImage,
        headers: new Headers({
          'Content-Type': 'image/*'
        })
      })
    );
    if (response.status !== 200) {
      // The upload failed, so let's notify the caller.
      onError((err) => {
        alert(err);
      });
      return;
    }
    // Let the caller know that the upload is done, so that it can send the URL
    // to the backend again, persisting it to the database.
    onUploadReady();

    // create image record
    // array
    // associated images with item
  }

  return useDropzone({
    accept: 'image/*',
    disabled: typeof presignedUploadUrl !== 'string',
    handleDrop
  });
}
