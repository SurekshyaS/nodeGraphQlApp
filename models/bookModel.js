const createConnection = require('./dbConnection');

const uri = "mongodb+srv://surekshyasharma:AvN808zZTOKgAytY@cluster0.61bn5.mongodb.net/author?retryWrites=true&w=majority";
const dbName = "author";

// Get the books collection
const getBookCollection = async () => {
    const db = await createConnection(uri, dbName);
    return db.collection('books');
};

// Create a book
const createBook = async (book) => {
    const collection = await getBookCollection();
    const result = await collection.insertOne(book);
    return result;
};

// Find all books
const findBooks = async () => {
    const collection = await getBookCollection();
    const books = await collection.aggregate([
        {
            $lookup: {
                from: 'authors',
                localField: 'author',
                foreignField: '_id',
                as: 'author'
            }
        }
    ]).toArray();
    return books;
};

module.exports = { createBook, findBooks };
