import { gql } from 'apollo-server-express';

 const typeDefs = gql`


type Query {
    cuentas:[Cuenta]
    cuenta(id:Int):Cuenta
    uploads:[File]
}

type File {
    filename: String!
    mimetype: String!
    encoding: String!
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
  singleUpload(file: Upload!): Boolean
  singleUpload2(file: MyUpload!): Boolean
}
input MyUpload{
  name:String!
  type:String!
  size:Int!
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

`




export default typeDefs;