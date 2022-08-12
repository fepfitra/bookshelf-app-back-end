const nanoid = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    //requests
    const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

    //additional strucutre
    //error responses
    //if name is empty
    if (bame === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    //if readPage > pageCount
    if (readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    
    const id = nanoid(16);
    const finished = (pageCount === readPage);
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