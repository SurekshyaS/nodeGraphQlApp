const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP 
const mongoose = require('mongoose')
const { createAuthor, findAuthors } = require('./models/authorModel');
const { createBook, findBooks } = require('./models/bookModel');
const app = express();

app.use(express.json());

app.post('/authors', async (req, res) => {
    try {
        const result = await createAuthor(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/authors', async (req, res) => {
    try {
        const authors = await findAuthors();
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/books', async (req, res) => {
    try {
        const result = await createBook(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/books', async (req, res) => {
    try {
        const books = await findBooks();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

// Define the GraphQL schema
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'HelloWorld',
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: () => 'Hello World'
            }
        })
    })
});

// Set up the /graphql endpoint with the schema and GraphiQL interface enabled
app.use('/graphql', expressGraphQL({
    schema: schema,   // Uncomment this line to use the schema
    graphiql: true    // Enable GraphiQL interface for testing queries
}));

// Start the server
app.listen(8080, () => console.log("Server is running on port 8080"));
