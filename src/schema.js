import {makeExecutableSchema } from "graphql-tools";
import {gql} from 'apollo-server-express'
import resolve from "./resolve"

const typeDefs =`
  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
type Query {
    file_:File!
    cuentas:[Cuenta]
    cuenta(id:Int):Cuenta    
}
type Cuenta{  
    ID: Int
    ID_USERS: Int
    FECHA: String
    DESCIPCION: String
    DEBE: Int
    HABER: Int
    TIPO_PAGO: Int
    BANCO: Int
    REF: Int
    URL: String
    CONCEPTO: Int
    CUENTA: String
},
type Mutation{
  addCuenta(input:CuentaInput!):Cuenta
  singleUpload(file: Upload!): Boolean!
}
input CuentaInput{    
    ID_USERS: Int
    FECHA: String!
    DESCIPCION: String!
    DEBE: Int!
    HABER: Int!
    TIPO_PAGO: Int!
    BANCO: Int!
    REF: Int!
    URL: String!
    CONCEPTO: Int!
    CUENTA: String!

}
`;

//export default typeDefs;

export default makeExecutableSchema({
    typeDefs:typeDefs,
    resolvers:resolve
});

