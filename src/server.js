import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import schema from "./schema";
import cord from 'cors'
const graphqlHTTP = require('express-graphql')
import './database/database';
import router from './router'; 
const { graphqlUploadExpress } = require('graphql-upload')
const app = express();

app.set('port',process.env.PORT||4001)
//Middlewere
app.use(morgan('dev'))
app.use( bodyParser.json())
app.use('/',router)

app.use(
    '/graphql',cord(),
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    graphqlHTTP({ schema,graphiql:true})
  )

app.listen(app.get('port'),()=>console.log("server on port",app.get('port')))