import { Router, Request, Response } from "express";
import { getRepository } from "typeorm"; //za sve sto radimo sa bazom koristimo getRepository
import { Banka } from "../entity/Banka";
import { Radnik } from "../entity/Radnik";

const router = Router();

router.get('/',(req,res)=>{ 

   
    getRepository(Radnik).find().then(value=>{

        res.json(value); 
    })

})

export default router; 

