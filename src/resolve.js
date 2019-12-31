import pool from './database/database';
export const  resolve ={    
    Query:{        
        
        cuentas:async()=>{
            const row = await pool.query('SELECT * FROM CONTABILIDAD');
            return row
        },
        cuenta:async (root, { id },context)=>{
            const [row] = await pool.query('SELECT * FROM CONTABILIDAD WHERE ID =?',[id]);
            return row
        }        
    },
    Mutation:{
        addCuenta:async (_, {input},context)=>{                                  
             input.FECHA= new Date().toISOString().split("T").map((res,i)=>{
                if(i===0) 
                return res
                else                 
                return res.split(".")[0]                
            }).join(" ")      
            try{      
            await pool.query('INSERT INTO CONTABILIDAD SET ?',input)
            return input
            }
            catch(e){
                return null                
            }
        },
        singleUpload: (parent, args) => {
            return args.file.then(file => {
              //Contents of Upload scalar: https://github.com/jaydenseric/graphql-upload#class-graphqlupload
              //file.stream is a node stream that contains the contents of the uploaded file
              //node stream api: https://nodejs.org/api/stream.html
              return file;
            })
    
    }
}
};