if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
  
const express = require('express');
const app = express();

require('./server/minio/api')(app)

app.get('/api/greet', (req, res) => {
    res.send({hi: 'there'});
});

app.listen(5000);
