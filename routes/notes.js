const notes = require('express').Router();
const fs = require('fs');

//GET ROUTE FOR RETRIEVING NOTES
notes.get('/', (req, res) => {
    //NEED TO FILL IN GET CODE HERE
    console.log(`${req.method} request recived. Pulling notes form db.json`);
    //read db file and stringify it? 
})

//POST ROUTE FOR NEW NOTE
notes.post('/', (req, res) => {
    //NEED TO FILL IN POST CODE HERE
    console.info(`${req.method} request recived. Posting new note to db.json`);
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title, 
            text,
            //id: uuid() //NEED A UUID FUNCTION
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if(err) {
                console.error(err)
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4), 
                    (err) => 
                        err
                            ? console.error(err)
                            : console.info('Note successfully added!')
                );
            };
        });

        const response = {
            status: 'success',
            body: newNote
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error adding new note.')
    };
});

//DELETE ROUTE FOR EXISTING QUOTE

module.exports = notes;