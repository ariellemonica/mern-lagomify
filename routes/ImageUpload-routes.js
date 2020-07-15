//presignedUploadUrl will be a URL inside the lagomify-user-uploads S3 Bucket, in the items directory
const presignedUploadUrl = await getPresignedUploadUrl('lagomify-user-uploads', 'items');

async function getPresignedUploadUrl(bucket, directory) {
    const key = `${directory}/${uuid.v4()}`;
    const url = await s3
      .getSignedUrl('putObject', {
        Bucket: bucket,
        Key: key,
        ContentType: 'image/*',
        Expires: 300,
      })
      .promise();
    return url;
}