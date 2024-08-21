const createConnection = require('./dbConnection');

const uri = "mongodb+srv://surekshyasharma:AvN808zZTOKgAytY@cluster0.61bn5.mongodb.net/author?retryWrites=true&w=majority";
const dbName = "author";

const getAuthorCollection = async () => {
    const db = await createConnection(uri, dbName);
    return db.collection('authors');
};

// Create an author
const createAuthor = async (author) => {
    const collection = await getAuthorCollection();
    const result = await collection.insertOne(author);
    return result;
};

// Find all authors
const findAuthors = async () => {
    const collection = await getAuthorCollection();
    const authors = await collection.aggregate([
        {
            $lookup: {
                from: 'books',
                localField: 'books',
                foreignField: '_id',
                as: 'books'
            }
        }
    ]).toArray();
    return authors;
};

module.exports = { createAuthor, findAuthors };
