const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        isbn: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true,
        
        }
    },
    {
        collection: 'bookDataCollection'
    }
);

module.exports = mongoose.model('bookDataCollection', bookSchema);