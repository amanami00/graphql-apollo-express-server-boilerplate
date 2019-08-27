import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

app.use(cors());

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

const schema = gql`
    type Book {
        title: String
        author: String
    }

    type User {
        username: String!
    }

    type Query {
        books: [Book]
        me: User
        hello: String
    }
`;

const resolvers = {
    Query: {
        me: () => {
            return {
                username: 'Aman Singh',
            };
        },
        books: () => books,
        hello: () =>
            fetch('https://fourtonfish.com/hellosalut/?mode=auto')
                .then(res => res.json())
                .then(data => data.hello),
    },
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    mocks: true,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
});
