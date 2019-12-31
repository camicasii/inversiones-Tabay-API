import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress ,ApolloServer} from 'apollo-server-express';
import morgan from 'morgan';
import typeDefs from "./schema2";
import resolvers from './resolve'
import './database/database';
import router from './router'; 
const { graphqlUploadExpress } = require('graphql-upload')
const app = express();

app.set('port',process.env.PORT||4000)
//Middlewere
app.use(morgan('dev'))
app.use( bodyParser.json())
app.use('/',router)
const server = new ApolloServer({ typeDefs, resolvers, });

server.applyMiddleware({app})

app.listen(app.get('port'),()=>console.log("server on port",app.get('port')))