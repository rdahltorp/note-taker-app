const express = require('express');

let notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;