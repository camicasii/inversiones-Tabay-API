import express from 'express';
import morgan from 'morgan';
import graphqlHTTP from "express-graphql";
import schema from "./schema";
import './database/database';
import router from './router'; 
const { graphqlUploadExpress } = require('graphql-upload')
const app = express();


app.set('port',process.env.PORT||4000)
//Middlewere
app.use(morgan('dev'))
app.use(express.json())

app.use('/',router)
app.use('/graphql',
graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
graphqlHTTP({
    graphiql:true,
    schema:schema,        
    context:{
        messageId:"test"
    }
}));

app.listen(app.get('port'),()=>console.log("server on port",app.get('port')))