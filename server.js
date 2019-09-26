require('dotenv/config');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema.js')

// Connect to database and retry if no connection
const dbConnectWithRetry = async () => {
    try {
        // Connection to MongoDB
        await mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, function(err) {
            if (err) {
            console.log(err, "Error connecting to DB, retrying...");
            setTimeout(dbConnectWithRetry, 5000); // 5 seconds delay
            }
        });
    } catch (error) {
        console.log(process.env.DB_CONNECTION || 4000);
        console.log(error);
    }
}

// Starting the server
const startServer = async () => {
    const app = express();
    const server = new ApolloServer({ schema });
    server.applyMiddleware({ app });

    app.use(cors());
    app.use(bodyParser.json());

    dbConnectWithRetry(); // Attempt DB connection

    // What to do on states
    mongoose.connection.on('error', err => {
        console.log(err);
    });

    // Luanch Server
    app.listen(process.env.PORT, () =>
        console.log(`Server listening...`)
    );
}

startServer();
