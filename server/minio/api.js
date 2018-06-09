const minioClient = require('./minio-client')
const formidable = require('formidable');
const MINIO_BUCKET = 'manuscripts'

module.exports = app => {

    // Example: /api/list/files?bucketName=manuscripts
    app.get('/api/list/files', (req, res) => {
        const {
            bucketName
        } = req.query
        minioClient.listFiles(bucketName || MINIO_BUCKET, res)
    })

    app.get('/api/list/buckets', (req, res) => {
        minioClient.listBuckets()
        res.send({
            Status: 'OK'
        });
    })

    // Example: /api/file/upload?bucketName=manuscripts&file=/Temp/text.txt
    app.get('/api/file/upload', (req, res) => {
        const {
            bucketName,
            file
        } = req.query
        console.log('bucketName: ' + bucketName)
        console.log('file: ' + file)
        minioClient.uploadFile(bucketName, file)
        res.send({
            Status: 'OK'
        });
    })

    // Example: /api/file/delete?bucketName=manuscripts&file=839d94f0-6b6d-11e8-ae97-1186fb320cc0
    app.get('/api/file/delete', (req, res) => {
        const {
            bucketName,
            file
        } = req.query
        console.log('bucketName: ' + bucketName)
        console.log('file: ' + file)
        minioClient.deleteFile(bucketName, file)
        res.send({
            Status: 'OK'
        });
    })

    app.post('/api/upload/file', (req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.file.path;
            minioClient.uploadFile(MINIO_BUCKET, oldpath)
            res.write('File uploaded and transferred to Minio!');
            res.end();
        });
    })
}