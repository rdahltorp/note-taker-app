let notes = require('express').Router();
const fs = require('fs');
const { send } = require('process');
const uuid = require('../helpers/uuid')

//GET ROUTE FOR RETRIEVING NOTES
notes.get('/', (req, res) => {
    console.log(`${req.method} request recived. Pulling notes form db.json`);
    //read db file and stringify it? 
    fs.readFile('./db/db.json', 'utf8', (err,data) => {
        if(err){
            console.log(err);
        } else {
            const prevNotes = JSON.parse(data);
            console.log(prevNotes);
            res.send(prevNotes)
        }
    })    
});

//POST ROUTE FOR NEW NOTE
notes.post('/', (req, res) => {
    console.info(`${req.method} request recived. Posting new note to db.json`);
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title, 
            text,
            id: uuid()
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
notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request recived. Deleting note id ${req.params.id}`);

    function filterOutId(id) {
        if(notes.id == id) {
            const newNotesArray = notes.filter(note => note.id !== id);
            notes = newNotesArray;
            res.send(notes);
        } else {
            res.send('An error occured');
        }
    }

    filterOutId(req.params.id);
});


//DELETE CODE I TRIED BUT DIDNT WORK 
//OPTION 1 - SAID notes.filter IS NOT A FUNCTION.
// notes.delete('/:id', (req, res) => {
//     console.info(`${req.method} request recived. Deleting note id ${req.params.id}`);

//     const deleteNoteId = req.params.id;
//     const newNotesArray = notes.filter(note => note.id != deleteNoteId); //Says notes.filter is not a function. Not sure why this is an issue.
//     res.send(newNotesArray)

//     if(!newNotesArray){
//         console.log(err);
//     }else{
//         notes = newNotesArray
//         res.send(notes)
//     };
  
// });

//OPTION 2 – Does nothing. 
// notes.delete('/:id', (req, res) => {
//     console.info(`${req.method} request recived. Deleting note id ${req.params.id}`);

//     const deleteNoteId = req.params.id;

//     fs.readFile('./db/db.json', 'utf8', (err, data) => {
//         if(err) {
//             console.error(err)
//         } else {
//             let parsedNotes = JSON.parse(data);
//             const newNotesArray = parsedNotes.filter(note => note.id != deleteNoteId); 
//             notes = newNotesArray

//             fs.writeFile(
//                 './db/db.json',
//                 JSON.stringify(parsedNotes, null, 4), 
//                 (err) => 
//                     err
//                         ? console.error(err)
//                         : console.info('Note successfully deleted!')
//             );
//         };
//     });
// });


//OPTION 3 - Returns syntax error of unexpected token u in JSON at position 1. 
// notes.delete('/:id', (req, res) => {
//     console.info(`${req.method} request recived. Deleting note id ${req.params.id}`);

//     const deleteNoteId = req.params.id;
//     let parsed = JSON.parse(notes)
//     const newNotesArray = parsed.filter(note => note.id != deleteNoteId); 
//     notes = newNotesArray
//     res.send(notes)

// });


//OPTION 4 (currently live) - Does nothing. 
// notes.delete('/:id', (req, res) => {
//     console.info(`${req.method} request recived. Deleting note id ${req.params.id}`);

//     function filterOutId(id) {
//         if(notes.id == id) {
//             const newNotesArray = notes.filter(note => note.id !== id);
//             notes = newNotesArray;
//             res.send(notes);
//         } else {
//             res.send('An error occured');
//         }
//     }

//     filterOutId(req.params.id);
// });

module.exports = notes;