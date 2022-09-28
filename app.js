import express from "express";
import fs from 'fs';

const app = express();
const port = 3000;

app.use(express.json());

/**
 * Creates hex ids for new and updated books.
 * @returns 
 */
const setId = () => {
    return [...Array(12)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

/**
 * Is the object that holds the data of the books.
 */
let obj;
fs.readFile('books.json', 'utf8', (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
});

/**
 * Writes the new or updated json data into the root json file.
 * @param {*} jsonFile 
 */
const writeToFile = (jsonFile) => {
    fs.writeFileSync('books.json', JSON.stringify(jsonFile), (err) => {
        if (err) {
            res.status(400).send('Bad Request.', err);
        }
    });
    
}

/**
 * Creates a new book to be pushed into the JSON.
 * @param {*} newBook 
 * @param {*} currentBooks 
 * @param {*} res 
 */
const createNewBook = (newBook, currentBooks, res) => {
    newBook['id'] = setId();
    
    currentBooks.books.push(newBook);
 
    writeToFile(currentBooks);
    res.status(201).send(newBook);
}

app.get('/helloworld', (req, res) => {
    res.status(200).send('Hello World!');
})

/**
 * Gets all books and optional search by publisher using string params.
 */
app.get('/books', (req, res) => {
    const queryParam = req.query.publisher;
        
    if (queryParam) {
        res.status(200).send(obj.books.filter(book => book.publisher === queryParam));
    } else if (obj.length === 0) {
        res.sendStatus(400);
    } else {
         res.status(200).send(obj.books);
    }

});

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    
    const filteredBooks = obj.books.filter(book => book.id === id);
    if (id && filteredBooks.length > 0) {
        res.status(200).send(filteredBooks);
    } else {
        res.sendStatus(404);
    }
})

app.post('/books', (req, res) => {
    const newBook = req.body;

    if (!newBook || newBook.id) {
        res.sendStatus(400);
        return;
    }
    
    createNewBook(newBook, obj, res);
});

app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const updatedBook = req.body;
    
    let i;
    const bookFound = obj.books.find((book, index) => {
        i = index;
        return book.id.toString() === id;
    });
    
    if (!bookFound) {
        createNewBook(updatedBook, obj, res);
    } else {
        obj.books.splice(i, 1, updatedBook);
        writeToFile(obj);
        res.status(204).send(obj);
    }
});

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;

    const bookLoc = obj.books.findIndex((book) => {
        return book.id === id
    });

    if (bookLoc > -1) {
        obj.books.splice(bookLoc, 1);
        writeToFile(obj);
        res.status(204).send(obj);
    } else {
        res.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})