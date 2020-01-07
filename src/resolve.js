import pool from './database/database';
import fs,{unlink} from "fs"
import stream from 'stream'
const  resolve ={    
    Query:{   
      file_:()=>{
        return{"filename":"filename.toString()",
          "mimetype":"mimetype.toString()",
          "encoding":"encoding.toString()"}
      },
        
        cuentas:async()=>{
            const row = await pool.query('SELECT * FROM CONTABILIDAD');
            return row
        },
        cuenta:async (root, { id },context)=>{
          console.log(id);
          
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
        singleUpload:async (parent, args) => {                       
          const {filename,mimetype,encoding,createReadStream} =  await args.file          
          const stream = createReadStream()
          const id = Math.random()*999
          const UPLOAD_DIR = __dirname + "/uploads"
          const path = `${UPLOAD_DIR}/${id}-${filename}`
          const file = { id, filename, mimetype, path }          
          return new Promise(async (resolve,rejects)=>{
            const writeStream =  fs.createWriteStream(path)
            writeStream.on('finish', ()=>resolve(true))
            stream.pipe(writeStream)
            writeStream.on('error', error => {
              unlink(path, () => {
                reject(false)
              })
            })                        
          })
          
        }
          
}
}
export default resolve;




/*


const {filename,mimetype,encoding,createReadStream} =  await args.file
const stream = createReadStream()
const id = Math.random()*999999
const UPLOAD_DIR = __dirname + "/uploads"
const path = `${UPLOAD_DIR}/${id.toString()}-${filename}`
const file = { id, filename, mimetype, path }
  // Store the file in the filesystem.
await new Promise((resolve, reject) => {
// Create a stream to which the upload will be written.
const writeStream = createWriteStream(path)
console.log("ASASAS");


// When the upload is fully written, resolve the promise.
writeStream.on('finish', resolve)

// If there's an error writing the file, remove the partially written file
// and reject the promise.
writeStream.on('error', error => {
unlink(path, () => {
reject(error)
})
})


// In node <= 13, errors are not automatically propagated between piped
// streams. If there is an error receiving the upload, destroy the write
// stream with the corresponding error.
stream.on('error', error => writeStream.destroy(error))

// Pipe the upload into the write stream.
stream.pipe(writeStream)
})


console.log("####################3");



return true            
},

}*/