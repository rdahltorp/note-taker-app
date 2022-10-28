const express = require('express');
const path = require('path');
const api = require('./public/assets/js/index.js')

const PORT = process.env.PORT || 3001;

const app = express();

//MIDDLEWARE 
app.use(express.json());
app.use(express.urlencoded({ extend: true }));
//app.use('/api', api);
app.use(express.static('public'));

// GET ROUTES
//GET Homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET Notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//APP LISTENER
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);