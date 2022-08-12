const nanoid = require('nanoid');

const addBookHandler = (request, h) => {
    //requests
    const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

    //additional strucutre
    const id = nanoid(16);
    const finished = () => {
        return readPage === pageCount;
    }
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    //newBook
    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };
    
    //push newBook to books
    books.push(newBook);
}

module.exports = { addBookHandler };