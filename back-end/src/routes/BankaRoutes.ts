import { Router, Request, Response } from "express";
import { getRepository } from "typeorm"; //za sve sto radimo sa bazom koristimo getRepository
import { Banka } from "../entity/Banka";

const router = Router();

router.get('/', (req, res) => { //hoce sve radnike

    //find vraca promisse pa ide obavezno.then
    getRepository(Banka).find().then(value => {

        res.json(value); //da bi ga slao u jsonu
    })

})
router.get('/:id', async (req, res) => {//hoce samo jednog sa tim idjem

    let radnik = await getRepository(Banka).findOne(req.params.id); //req.params uzima bilo koji atribut requesta iz '/..' 
    res.json(radnik);

})
router.post('/', (req, res) => {//dodaj novog

    const b = req.body as Banka;
    if (b.getNaziv().length < 2) {
        res.json({
            greska: 'Kratak naziv'
        });
        return;
    }
    getRepository(Banka).insert(req.body).then(value => {

        res.json({ ...req.body, id: value.identifiers[0].id }) //... znaci da imemo taj neki objekat koji se zove req.body i mi hocemo da 
        //napravimo kopiju objekta body i plus mu dodaj property id
    })


})


router.patch('/:id', (req, res) => {//izmeni sa tim idjem

    getRepository(Banka).update(req.params.id, req.body).then(value => { //dodaj findOne pre updatea i pre patcha

        return getRepository(Banka).findOne(req.params.id)


    }).then(value => {

        res.json(value);
    })



});


router.delete('/:id', (req, res) => {//obrisi sa tim idjem

    getRepository(Banka).delete(req.params.id).then(value => {

        res.sendStatus(200);

    })
})

export default router; // kad ne bi bilo default morala bih da stavljam viticaste zagrade u import i morao bi da ze zove router

