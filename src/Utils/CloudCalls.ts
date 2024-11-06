import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const s3 = new AWS.S3();

type ImageFile = File;

const uploadMultipleImages = async (files: ImageFile[]): Promise<string[]> => {
  const imageUrls: string[] = [];
  for (const file of files) {
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      imageUrls.push(imageUrl);
    }
  }
  return imageUrls;
};

const uploadImage = async (file: ImageFile): Promise<string | undefined> => {
  const imageName = uuidv4();
  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.REACT_APP_S3_BUCKET_NAME as string,
    Key: imageName,
    Body: file,
    ContentType: file.type,
  };

  try {
    const data = await s3.upload(params).promise();
    console.log(`Success: Image uploaded to S3 ${imageName}`);
    return data.Location;
  } catch (err) {
    console.log('Error uploading image: ', err);
  }
};

const deleteImage = async (imageName: string): Promise<void> => {
  const bucketName = process.env.REACT_APP_S3_BUCKET_NAME;

  if (!bucketName) {
    console.error('S3 bucket name is not defined in environment variables');
    return;
  }

  const params: AWS.S3.DeleteObjectRequest = {
    Bucket: bucketName,
    Key: imageName,
  };

  try {
    await s3.deleteObject(params).promise();
    console.log(`Success: Image deleted from S3: ${imageName}`);
  } catch (err) {
    console.error(`Error deleting image from S3: ${imageName}`, err);
  }
};


const deleteMultipleImages = async (imageNames: string[]): Promise<void> => {
  for (const imageName of imageNames) {
    await deleteImage(imageName);
  }
};

// const getImages = async (): Promise<AWS.S3.ObjectSummary[] | undefined> => {
//   const params: AWS.S3.ListObjectsV2Request = {
//     Bucket: process.env.IMAGES_BUCKET_NAME as string,
//   };

//   try {
//     const data = await s3.listObjectsV2(params).promise();
//     return data.Contents;
//   } catch (err) {
//     console.log('Error getting images: ', err);
//   }
// };

// const getMultipleImages = async (imageNames: string[]): Promise<AWS.S3.ObjectSummary[]> => {
//   const images: AWS.S3.ObjectSummary[] = [];
//   for (const imageName of imageNames) {
//     const image = await getImages();
//     if (image) {
//       images.push(...image); // Adjust this according to your needs
//     }
//   }
//   return images;
// };

export {
  uploadMultipleImages,
  uploadImage,
  deleteImage,
  deleteMultipleImages,
//   getImages,
//   getMultipleImages,
};
