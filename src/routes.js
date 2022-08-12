const { addBookHandler, getAllBooksHandler } = require("./handler");

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
    }
]

module.exports = routes;