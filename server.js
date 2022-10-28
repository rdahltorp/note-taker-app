const express = require('express');
const path = require('path');
const api = require('./routes/index')

const PORT = process.env.PORT || 3001;

const app = express();

//MIDDLEWARE 
app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use('/api', api);
app.use(express.static('public'));

// GET ROUTES
//GET Notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//GET Homepage
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//APP LISTENER
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);