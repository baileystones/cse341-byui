const express = require('express'); 
const app = express();

app.get('/', (req, res) => {
    res.send('Curtis Stones');
});

const port = 3000;

app.listen(process.env.PORT || port);
console.log('Web server is listening at port ' + (process.env.PORT || port));