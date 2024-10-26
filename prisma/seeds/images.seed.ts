import { S3 } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import config from '../../src/config/config';

const s3 = new S3({
  credentials: {
    accessKeyId: config().S3_ACCESS_KEY_ID,
    secretAccessKey: config().S3_SECRET_ACCESS_KEY,
  },
  region: 'ru-1',
  endpoint: 'https://s3.timeweb.cloud',
  forcePathStyle: true,
  apiVersion: 'v4',
});

async function deleteAllObjectsFromS3() {
  const bucket = config().S3_BUCKET;
  const listParams = {
    Bucket: bucket,
  };

  try {
    const listedObjects = await s3.listObjectsV2(listParams);
    if (listedObjects.Contents.length > 0) {
      const deleteParams = {
        Bucket: bucket,
        Delete: {
          Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
        },
      };
      await s3.deleteObjects(deleteParams);
      console.log('Deleted all objects from S3');
    }
  } catch (error) {
    console.error('Error deleting objects from S3:', error);
  }
}

async function uploadImagesFromFolder(folderPath: string, s3Folder: string) {
  const files = fs.readdirSync(folderPath);

  for (const fileName of files) {
    const filePath = path.join(folderPath, fileName);
    const fileBuffer = fs.readFileSync(filePath);

    const s3Key = `${s3Folder}/${fileName}`;
    await s3.putObject({
      Bucket: config().S3_BUCKET,
      Key: s3Key,
      Body: fileBuffer,
      ContentType: 'image/jpeg',
    });
    console.log(`Uploaded ${fileName} to ${s3Key}`);
  }
}

export async function seedImages() {
  console.log('Deleting all images from S3...');
  await deleteAllObjectsFromS3();
  console.log('Uploading images to S3...');
  await uploadImagesFromFolder('images/concert', 'concert');
  await uploadImagesFromFolder('images/product', 'product');
}

seedImages().catch(console.error);
