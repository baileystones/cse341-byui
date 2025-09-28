require('dotenv').config();  
const express = require('express'); 
const app = express();
const lesson1Controller = require('./controllers/lesson1');
const { connectToDb } = require('./db/connection');

app.use(express.json());

app.get('/', lesson1Controller.curtisRoute);
app.get('/rachel', lesson1Controller.rachelRoute);

app.use('/', require('./routes'));            
app.use('/contacts', require('./routes/contacts'));

const port = 3000;

connectToDb()
    .then(() => {
        app.listen(process.env.PORT || port, () => {
            console.log('Web server is listening at port ' + (process.env.PORT || port));
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });