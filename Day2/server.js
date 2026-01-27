const express = require('express');
const app = express();  //server instance is created



app.get('/', (req, res) => {
  res.send('Hello World!')  //response sent to client
});

app.get('/about', (req, res) => {
  res.send('This is about page')  //response sent to client
});



app.listen(3000)  //server started