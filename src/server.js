import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress ,ApolloServer,GraphQLUpload} from 'apollo-server-express';
import morgan from 'morgan';
import typeDefs from "./schema2";
import resolvers from './resolve'
import './database/database';
import router from './router'; 
import path from 'path'
const app = express();
import multer from  'multer'
app.set('port',process.env.PORT||4001)
//Middlewere
app.use(morgan('dev'))
app.use( bodyParser.json())

const storage = multer.diskStorage({
    destination:(req,file,cb)=>cb(null,path.join(__dirname,'/uploads')),
    filename:(req,file,cb)=>cb(null,file.originalname.concat('-',Date.now())),
    
    
})

var upload = multer({storage}).single("upload")

app.use(upload)

app.use('/',router)


const server = new ApolloServer({ typeDefs, resolvers,
context:(req)=>{
    
    

}});

server.applyMiddleware({app,cors:true
})

app.listen(app.get('port'),()=>console.log("server on port",app.get('port')))