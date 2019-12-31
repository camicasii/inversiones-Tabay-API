import {makeExecutableSchema } from "graphql-tools";


import {resolve} from "./resolve"


//se debe colocar al menos una consulta de lo contrario express da error
const typeDefs =`
type Query {
    cuentas:[Cuenta]
    cuenta(id:Int):Cuenta
    uploads: File
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
  singleUpload(file: Upload!): File!
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
/**
 * nota que name:String! es para que la variable sea obligatoria de lo
 * contrario dara error
 * *******************************************************
 * en el caso de Task la opcion ! hace que si quieres el dato debes pedirlo 
 * de lo contrario se mostrara como consulta por defecto
 ****************************
 * nota agregamos input a una de las entradas esto parte de la sIntaxi de graphQL
 * requerida para crear input para las mutaciones
 */

export default makeExecutableSchema({
    typeDefs:typeDefs,
    resolvers:resolve
});

/**
 * consultas mutaciones 
 * mutation{
  createTask(input:{
    title:"Tasasfasf"
    description:"adfasderwrfwa"
    number:125
  }){
    _id
    title
    description
    number    
  }
}
 */