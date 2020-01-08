import {makeExecutableSchema } from "graphql-tools";
import {gql} from 'apollo-server-express'
import resolve from "./resolve"

const typeDefs =gql`
  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
################################ Query #################################################
  type Query {    
    cuentas:[Cuenta]
    cuenta(id:ID):Cuenta    
  }
  type Cuenta{  
    ID: ID
    ID_USERS: ID
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

################################ Mutation #################################################
type Mutation{
  addCuenta(input:CuentaInput!,file:Upload):Cuenta
  deleteCuenta(id:ID):Boolean!
  editCuenta(input:CuentaInput!,id:ID!,file: Upload):Boolean!
  
  singleUpload(file: Upload!,id:ID): Boolean!
}

input CuentaInput{    
    ID_USERS: ID
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

}
`;

//export default typeDefs;

export default makeExecutableSchema({
    typeDefs:typeDefs,
    resolvers:resolve
});

