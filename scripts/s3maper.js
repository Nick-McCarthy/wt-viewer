require('dotenv').config();

const AWS = require('aws-sdk');
const fs = require('fs');

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

function generateInsertStatement(contentType, comicTitle, chapterNumber, imageOrdering, imagePath) {
  const cleanContentType = contentType.replace(/-/g, ' ');
  const cleanComicTitle = comicTitle.replace(/-/g, ' ');;
  const cleanChapterNumber = parseInt(chapterNumber);
  const cleanImageOrdering = parseInt(imageOrdering);
  const cleanImagePath = imagePath;

  return `INSERT INTO ${cleanContentType}_chapters (ip_title, chapter_number, image_ordering, image_path) VALUES ('${cleanComicTitle}', ${cleanChapterNumber}, ${cleanImageOrdering}, '${cleanImagePath}');\n`;
}

function listObjectsInBucket(continuationToken = null) {
  const params = { Bucket: S3_BUCKET_NAME };
  if (continuationToken) {
    params.ContinuationToken = continuationToken;
  }

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error("Error listing objects:", err);
      return;
    }
    data.Contents.forEach(obj => {
      const key = obj.Key;
      const [contentType, comicTitle, chapterDir, imageOrdering] = key.split('/');
      const chapterNumber = chapterDir ? parseInt(chapterDir.replace(/\D/g, '')) : 0;
      const imagePath = `https://s3.amazonaws.com/${S3_BUCKET_NAME}/${key}`;
      const insertStatement = generateInsertStatement(contentType, comicTitle, chapterNumber, imageOrdering, imagePath);
      fs.appendFileSync('insert_statements.sql', insertStatement);
    });

    if (data.IsTruncated) {
      listObjectsInBucket(data.NextContinuationToken);
    }
  });
}

listObjectsInBucket();