import { Router, Request, Response } from "express";
import { getRepository } from "typeorm"; //za sve sto radimo sa bazom koristimo getRepository
import { Radnik } from "../entity/Radnik";
import { Upit } from "../entity/Upit";
import { get } from "https";
import { read } from "fs";
import { StavkaUpita } from "../entity/StavkeUpita";

const router = Router();

router.get('/', (req, res) => {

    getRepository(StavkaUpita).find().then(value => {

        res.json(value);

    })

})

router.get('/:id', async (req, res) => {

   let stavka = await getRepository(StavkaUpita).findOne(req.params.id);

        res.json(stavka);

    

})

router.post('/', (req, res) => {

    getRepository(StavkaUpita).insert(req.body).then(value=>{

 res.json({...req.body,id:value.identifiers[0].id})

    })

})

router.patch('/:id',(req,res)=>{

    getRepository(StavkaUpita).update(req.params.id,req.body).then(value =>{
    
    getRepository(StavkaUpita).findOne(req.params.id)
    
    }).then(value=>{
    
        res.json(value);
    
    })
    
    })
    
    router.delete('/:id',(req,res)=>{
    
    getRepository(StavkaUpita).delete(req.params.id).then(value=>{
    
        res.sendStatus(200);
    })
    
    })
        




export default Router;