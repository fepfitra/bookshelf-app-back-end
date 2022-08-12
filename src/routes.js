const { addBookHandler, getAllBooksHandler, getBookByIdHandler} = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
        options: {
            cors: {
                origin: ['*'],
            }
        }
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
        options: {
            cors: {
                origin: ['*'],
            }
        }
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler,
        options: {
            cors: {
                origin: ['*'],
            }
        }
    }
]

module.exports = routes;