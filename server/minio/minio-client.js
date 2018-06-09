const Minio = require('minio')
const uuidv1 = require('uuid/v1')

// Instantiate the minio client with the endpoint
// and access keys as shown below.
const minioClient = new Minio.Client({
   endPoint: process.env.MINIO_ACCESS_ENDPOINT,
   port: Number(process.env.MINIO_ACCESS_PORT),
   secure: (process.env.MINIO_ACCESS_SECURITY === 'true'),
   accessKey: process.env.MINIO_ACCESS_KEY,
   secretKey: process.env.MINIO_ACCESS_SECRET
});

module.exports = {
    listFiles(bucketName) {
        let stream = minioClient.listObjects(bucketName);
        stream.on('data', function(obj) {
            console.log(obj)
        })
        stream.on('error', function(err) {
            console.log(err)
        })
    },

    // https://docs.minio.io/docs/javascript-client-api-reference#listBuckets
    listBuckets() {
        minioClient.listBuckets((err, buckets) => {
            if (err) return console.log(err)
            console.log('buckets :', buckets)
        });
    },

    uploadFile(bucketName, file) {
        var metaData = {
          'Content-Type': 'text/html',
          'Content-Language': 123,
          'X-Amz-Meta-Testing': 1234,
          'example': 5678
        }
        minioClient.fPutObject(bucketName, uuidv1(), file, metaData, (err, etag) => {
          return console.log(err, etag) // err should be null
        })
    },

    deleteFile(bucketName, objectName) {
        minioClient.removeObject(bucketName, objectName, function(err) {
            if (err) {
              return console.log('Unable to remove object', err)
            }
            console.log('Removed the object')
        })
    }
}