import { Router, Request, Response } from "express";
import { getRepository } from "typeorm"; //za sve sto radimo sa bazom koristimo getRepository
import { Odeljenje } from "../entity/Odeljenje";

const router = Router();

router.get('/',(req,res)=>{ 

   
    getRepository(Odeljenje).find().then(value=>{

        res.json(value); 
    })

})

export default router; 
