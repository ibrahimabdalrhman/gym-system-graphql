const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
dotenv.config();
const schema=require('./schema/schema');
const resolvers=require('./resolvers')

const connectDB = require("./config/db").apply();


app.use('/graphql',graphqlHTTP({
    schema,
    rootValue:resolvers,
    graphiql:true
}))

const port = process.env.PORT;
app.listen(port, () => console.log(`App Running on Port ${port}`));
