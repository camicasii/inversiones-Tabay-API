import { Router } from 'express';
import pool from './database/database';
const router =  Router()


router.get("/upload",(req,res)=>{
    console.log(req.file);
    
    return res.json({hola:123})

})
router.post("/upload",(req,res)=>{
    console.log(req.file);
    
    return res.json({hola:123})

})
router.get('/',async (req,res)=>{
    const row = await pool.query('SELECT * FROM CONTABILIDAD');
    console.log(row);
    

    res.json({hola:row})
})

export  default router;


