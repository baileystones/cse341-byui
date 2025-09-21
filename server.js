const express = require('express'); 
const app = express();
const lesson1Controller = require('./controllers/lesson1');

app.use(express.json());

app.get('/', lesson1Controller.curtisRoute);
app.get('/rachel', lesson1Controller.rachelRoute);

const port = 3000;
app.use('/', require('./routes'));

app.listen(process.env.PORT || port);
console.log('Web server is listening at port ' + (process.env.PORT || port));