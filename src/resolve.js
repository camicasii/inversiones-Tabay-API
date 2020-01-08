import pool from "./database/database";
import fs, { unlink } from "fs";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import * as path_ from "path";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOAD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const resolve = {
  //################################ Query #################################################
  Query: {
    cuentas: async () => {
      const row = await pool.query("SELECT * FROM CONTABILIDAD");
      return row;
    },
    cuenta: async (root, { id }, context) => {
      const [row] = await pool.query("SELECT * FROM CONTABILIDAD WHERE ID =?", [
        id
      ]);
      if (row !== undefined) return row;
      else null;
    }
  },
  //################################ Mutation #################################################
  Mutation: {
    /*******************************addCuenta*****************************************/
    addCuenta: async (_, { input, file }, context) => {
      input.FECHA = await newData();
      try {
        let updateDataReady = false;
        if (file) {
          const url = await MyUpload(file, null);
          updateDataReady = Object.assign(input, url);
        }
        updateDataReady = updateDataReady ? updateDataReady : input;
        await pool.query("INSERT INTO CONTABILIDAD SET ?", updateDataReady);
        return input;
      } catch (e) {
        return null;
      }
    },
    /*******************************deleteCuenta*****************************************/
    deleteCuenta: async (_, { id }) => {
      try {
        const [row] = await pool.query(
          "SELECT * FROM CONTABILIDAD WHERE ID=?",
          id
        );
        if (row !== undefined) {
          const { affectedRows } = await pool.query(
            "DELETE FROM `CONTABILIDAD` WHERE `CONTABILIDAD`.`ID` = ?",
            id
          );
          if (affectedRows > 0) return true;
          else return false;
        } else return false;
      } catch {
        return false;
      }
    },
    /*******************************editCuenta*****************************************/

    editCuenta: async (_, { input, id, file }) => {
      const [row] = await pool.query(
        "SELECT * FROM CONTABILIDAD WHERE ID=?",
        id
      );
      if (row !== undefined) {
        let updateDataReady = false;
        if (file) {
          const url = await MyUpload(file, row.CLOUDYNARY_ID);
          updateDataReady = Object.assign(row, input, url);
        }

        updateDataReady = updateDataReady
          ? updateDataReady
          : Object.assign(row, input);

        const {
          affectedRows
        } = await pool.query("UPDATE CONTABILIDAD SET ? WHERE ID=?", [
          updateDataReady,
          id
        ]);
        if (affectedRows > 0) return true;
      } else return false;
    },
    /*******************************singleUpload*****************************************/

    singleUpload: async (_, args) => {
      const {
        filename,
        mimetype,
        encoding,
        createReadStream
      } = await args.file;
      const stream = createReadStream();
      const uploader = await uploadCloudinary(filename, stream);
      console.log(uploader);
      const urlNewImagen = {
        url: uploader.url,
        public_id: uploader.public_id
      };

      if (uploader !== false) return true;
      else return false;
    }
  }
};
export default resolve;

/************************************metodos*********************************************/

const newData = () => {
  return new Promise((resolve, reject) => {
    const data = new Date()
      .toISOString()
      .split("T")
      .map((res, i) => {
        if (i === 0) return res;
        else return res.split(".")[0];
      })
      .join(" ");
    if (data) {
      resolve(data);
    } else reject("");
  });
};

const uploadCloudinary = async (filename, stream, CLOUDYNARY_ID) => {
  try {
    const uploader = await clientImagen(filename, stream);
    let path = uploader;
    return new Promise(async (resolve, reject) => {
      if (uploader !== false) {
        let result = await cloudinary.uploader.upload(path, {
          folder: "test-cloudinary.app"
        });
        if (result) {
          await unlink(path, () => resolve(result));
        }
      } else {
        reject(false);
      }
    });
  } catch {
    return false;
  }
};

const clientImagen = async (filename, stream) => {
  const UPLOAD_DIR = __dirname + "/uploads";
  const path = `${UPLOAD_DIR}/${uuid()}-${path_.extname(filename)}`;
  // Store the file in the filesystem.
  return new Promise(async (resolve, rejects) => {
    // Create a stream to which the upload will be written.
    const writeStream = fs.createWriteStream(path);
    // When the upload is fully written, resolve the promise.
    writeStream.on("finish", () => resolve(path));

    // In node <= 13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    stream.on("error", error => writeStream.destroy(error));
    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on("error", error => {
      unlink(path, () => {
        reject(false);
      });
    });
    // Pipe the upload into the write stream.
    stream.pipe(writeStream);
  });
};

const MyUpload = async (file, CLOUDYNARY_ID) => {
  const { filename, mimetype, encoding, createReadStream } = await file;
  const stream = createReadStream();

  return new Promise(async (resolve, reject) => {
    try {
      const uploader = await uploadCloudinary(filename, stream);
      if (uploader) {
        if (CLOUDYNARY_ID !== null && CLOUDYNARY_ID !== undefined)
          await cloudinary.api.delete_resources(CLOUDYNARY_ID);
      }
      const urlNewImagen = {
        URL: uploader.url,
        CLOUDYNARY_ID: uploader.public_id
      };
      resolve(urlNewImagen);
    } catch {
      reject(false);
    }
  });
};
