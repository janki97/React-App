import { Router, Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { Upit } from '../entity/Upit';
import StavkeRoutes from '../routes/StavkeRoutes';
import { StavkaUpita } from "../entity/StavkeUpita";

const router = Router();

router.use('/:id/stavke', StavkeRoutes);

router.get('/', (req, res) => {

    getRepository(Upit).find().then(value =>

        res.json(value)
    );

})

router.get('/:id', async (req, res) => {

    let upit = await getRepository(Upit).findOne(req.params.id)

    res.json(upit);


});

router.post('/', (req, res) => {//dodaj novog



    getConnection().transaction(async manager => {
        const upit = new Upit(undefined, req.body.datum, req.body.radnik, [], req.body.magacin, req.body.zahtev, req.body.javniPoziv, req.body.odeljenje);
        const noviUpit = await manager.save(upit);
        if (req.body.stavke) {
            const stavke = req.body.stavke as StavkaUpita[];
            stavke.forEach(async element => {
                const st = new StavkaUpita(undefined, element.naziv, element.kolicina, element.jedinicaMere, noviUpit);
                const novaSt = await manager.save(st);
                noviUpit.stavke.push(novaSt);
            })
        }
        res.json(noviUpit);
    })


    // res.json({...req.body, id :value.identifiers[0].id}) //... znaci da imemo taj neki objekat koji se zove req.body i mi hocemo da 
    // //napravimo kopiju objekta body i plus mu dodaj property id


    /*  let { id, ...upit } = req.body as Upit;
     getConnection().transaction(async manager => {
 
         getRepository(Upit).insert(upit).then(value => {
             id = value.identifiers[0].id;
             let stavke = upit.stavke;
             stavke.forEach(element => {
                 element.upit = new Upit(id, upit.datum, upit.radnik, [], upit.magacin, upit.zahtev, upit.javniPoziv, upit.odeljenje);
             })
             return Promise.all((stavke as (StavkaUpita & { obrisana: boolean })[]).map((element: StavkaUpita & { obrisana: boolean }) => {
                 const { obrisana, id, ...stavka } = element;
                 return getRepository(StavkaUpita).insert(stavka);
             }))
         }).then(value => {
             return getRepository(Upit).findOne(id);
         }).then(value => {
             upit = value as Upit;
             return getRepository(StavkaUpita).find({
                 where: {
                     upit: {
                         id: id,
 
                     },
 
                 },
 
             });
         }).then(value => {
             upit.stavke = value;
             res.json(upit);
         })
     })
  */

})

router.patch('/:id', (req, res) => {

    let id = parseInt(req.params.id);
    const stariUpit = req.body as Upit;
    const stareStavke = (req.body.stavke as (StavkaUpita & { obrisana: boolean })[])
        // .filter(element => !element.obrisana)
        .map(element => {
            return new StavkaUpita(element.id === -1 ? undefined : element.id, element.naziv, element.kolicina, element.jedinicaMere, stariUpit);
        })
    getConnection().transaction(async manager => {

        console.log({ upitId: id });

        const upit = new Upit(id, stariUpit.datum, stariUpit.radnik, stareStavke, stariUpit.magacin, stariUpit.zahtev, stariUpit.javniPoziv, stariUpit.odeljenje);

        try {
            const noviUpit = await manager.save(upit);
            console.log('snimljeno');
            console.log({ noviId: noviUpit });
            if (req.body.stavke && (req.body.stavke as StavkaUpita[]).length > 0) {

                let stavke = req.body.stavke as (StavkaUpita & { obrisana: boolean })[];
                let stavkeZaBrisanje = stavke.filter(element => element.obrisana && element.id && element.id > 0);
                let stavkeZaSave = stavke.filter(element => !element.obrisana);
                stavkeZaSave.forEach(async element => {
                    const st = new StavkaUpita(element.id === -1 ? undefined : element.id, element.naziv, element.kolicina, element.jedinicaMere, upit);
                    const novaSt = await manager.save(st);
                    novaSt.setUpit(undefined);

                })
                console.log('snimljeno');
                stavkeZaBrisanje.forEach(element => {
                    manager.delete(StavkaUpita, {
                        id: element.id,
                        upit: {
                            id: id
                        }
                    })
                })
                console.log('obrisano');
            } else {
                manager.delete(StavkaUpita, {
                    upit: {
                        id: id
                    }
                })
            }
            res.json(noviUpit);
        } catch (error) {
            console.log(error);
        }
    })

    /* let noviUpit: Upit | undefined;
    let { id, stavke, ...upit } = req.body;
    id = parseInt(req.params.id);
    console.log(id);
    getRepository(Upit).update(req.params.id, upit).then(value1 => {
        getRepository(Upit).findOne(req.params.id).then(upitValue => {
            if (req.body.stavke) {
                let stavke = req.body.stavke as (StavkaUpita & { obrisana: boolean })[];
                let stavkeZaBrisanje = stavke.filter(element => element.obrisana && element.id && element.id > 0);
                let stavkeZaDodavanje = stavke.filter(element => element.id === -1);
                let stavkeZaIzmenu = stavke.filter(element => element.id && element.id > 0 && !element.obrisana);

                Promise.all(stavkeZaBrisanje.map(element => {
                    return getRepository(StavkaUpita).delete({
                        id: element.id,
                        upit: {
                            id: upitValue?.id
                        }
                    });
                })).then(value => {
                    return Promise.all(stavkeZaDodavanje.map(element => {
                        const { id, obrisana, ...stavka } = element;
                        return getRepository(StavkaUpita).insert({ ...stavka, upit: upitValue });
                    }))
                }).then(value => {
                    return Promise.all(stavkeZaIzmenu.map(element => {
                        const { id, obrisana, ...stavka } = element;
                        return getRepository(StavkaUpita).update({
                            id: element.id,
                            upit: {
                                id: upitValue?.id
                            }
                        }, stavka)
                    }))
                }).then(value => {
                    return getRepository(Upit).findOne(req.params.id);
                }).then(noviUpit => {
                    if (!noviUpit) {
                        res.json({ greska: 'greska' });

                    } else {
                        res.json(noviUpit);

                    }
                })
            }

        });
    }); */

})

router.delete('/:id', (req, res) => {

    getRepository(Upit).delete(req.params.id).then(value => {

        res.sendStatus(200);
    })

})


export default router;