import { Router, Request, Response } from "express";
import { getRepository } from "typeorm"; //za sve sto radimo sa bazom koristimo getRepository
import { Magacin } from "../entity/Magacin";

const router = Router();

router.get('/',(req,res)=>{ 

   
    getRepository(Magacin).find().then(value=>{

        res.json(value); 
    })

})

export default router; 
