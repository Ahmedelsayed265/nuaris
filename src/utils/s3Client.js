import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
const S3_BUCKET = "nuaris-staging";
const REGION = "me-south-1";
const endpointUrl = `https://s3.${REGION}.amazonaws.com/`;

export const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY
  },
  endpoint: endpointUrl
});

export const multipartUploadFile = async (file, name, folderName) => {

  console.log(file, name, folderName);
  

  const fileExtention = name.substring(name.lastIndexOf(".") + 1);
  const uniqueName = `${uuidv4()}.${fileExtention}`;
  const params = {
    Bucket: S3_BUCKET,
    Key: `${folderName}/${uniqueName}`,
    Body: file
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    if (data?.$metadata?.httpStatusCode === 200) {
      return `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${folderName}/${uniqueName}`;
    }
  } catch (err) {
    console.error("Error", err);
    throw new Error(err);
  }
};
