import { Router, Request, Response } from "express";
import { getRepository } from "typeorm"; //za sve sto radimo sa bazom koristimo getRepository
import { JavniPoziv } from "../entity/JavniPoziv";

const router = Router();

router.get('/',(req,res)=>{ 

   
    getRepository(JavniPoziv).find().then(value=>{

        res.json(value); 
    })

})

export default router; 
