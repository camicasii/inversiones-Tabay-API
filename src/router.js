import { Router } from "express";
import pool from "./database/database";
const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOAD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get("/upload", (req, res) => {
  console.log(req.file);

  return res.json({ hola: 123 });
});
router.post(
  "/upload",
  (req, res, next) => {
    if (req.file !== undefined) return next();
    return res.json({ state: 401 });
  },
  async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "test-cloudinary.app"
    });

    const { title, description } = req.body;
    const { filename, originalname, mimetype, size, path } = req.file;
`"UPDATE CONTABILIDAD set \`URL\` ="dfsfasdfsaf"  WHERE ID=18;"`
    const newimage = {
      title,
      description,
      filename,
      originalname,
      mimetype,
      size,
      path,
      url: result.url,
      public_id: result.public_id
    };
  }
);

router.get("/", async (req, res) => {
  const row = await pool.query("SELECT * FROM CONTABILIDAD");
  console.log(row);

  res.json({ hola: row });
});

export default router;
