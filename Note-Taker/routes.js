const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err)
            throw err;

        const notes = JSON.parse(data);

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, './public/index.html'));
        });

        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, './public/notes.html'));
        });

        

        app.get('/api/notes', (req, res) => {
            res.json(notes);
        });

        app.post('/api/notes', (req, res) => {
            let note = req.body;
            notes.push(note);
            jsonUpdate();
        });

        app.get('/api/notes/:id', (req, res) => {
            res.json(notes[req.params.id]);
        });

        app.delete('/api/notes/:id', (req, res) => {
            notes.splice(req.params.id, 1);
            jsonUpdate();
        });
        
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, './public/index.html'));
        });

        function jsonUpdate() {
            fs.writeFile('db/db.json', JSON.stringify(notes, '\t'), err => {
                if (err)
                    throw err;
                return true;
            });
        }

    });
}