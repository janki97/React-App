import { Router, Request, Response } from "express";
import { getRepository } from "typeorm"; //za sve sto radimo sa bazom koristimo getRepository
import { Zahtev } from "../entity/Zahtev";

const router = Router();

router.get('/',(req,res)=>{ 

   
    getRepository(Zahtev).find().then(value=>{

        res.json(value); 
    })

})

export default router; 
