const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    //requests
    const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

    //additional strucutre
    //error responses
    //if name is empty
    if (name === undefined){
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

    //response if success or not
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.harder('Access-Control-Allow-Origin', '*');
    response.code(500);
    return response;
}

const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;

    let filteredBooks = books;
    if(name!== undefined){
        filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }else if(reading !== undefined){
        filteredBooks = filteredBooks.filter((book) => book.reading ===!!Number(reading));
    }else if(finished !== undefined){
        filteredBooks = filteredBooks.filter((book) => book.finished ===!!Number(finished));
    }
    const response = h.response({
        status: 'success',
        data: {
            books: filteredBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    });

    response.code(200);
    return response;
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.filter((book) => book.id === bookId)[0];

    if (book !== undefined){
        const response = h.response({
            status: 'success',
            data: {
                book: book,
            },
        })
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;

}

const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.filter((book) => book.id === bookId)[0];

    if (book !== undefined){
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
        
        if (name === undefined){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }

        if (readPage > pageCount){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }

        const updatedAt = new Date().toISOString();
        const finished = (pageCount === readPage);
        const updatedBook = {
            ...book,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt,
        };
        books.splice(books.indexOf(book), 1, updatedBook);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
            data: {
                bookId: bookId,
            },
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler };