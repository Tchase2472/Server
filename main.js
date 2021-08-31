const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('Listening on 3000'));
app.use(express.static('public'));
app.use(express.json());

//Load database
const database = new Datastore({filename:'database.db'});
database.loadDatabase();


//Set up route server side
app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    
    data.timestamp = timestamp;
    console.log('I got a request');
    console.log(request.body);
    database.insert(data);

app.get('/api', (request, response) =>{
   database.find({}, (err, data) => {
    if(err){
       console.log('Something has gone wrong');
       response.end();
       return}
    response.json(data)
   });
});    

//Send a response from the server to the client
    response.json({
        status: 'Your request was received successfully',
        timestamp : timestamp,
        latitude : request.body.lat,
        longitude: request.body.long
    });
});

