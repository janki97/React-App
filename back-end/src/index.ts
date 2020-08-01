import express from 'express';
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as bodyParser from 'body-parser';
import cors from 'cors';
import BankaRoute from './routes/BankaRoutes';
import UpitRoute from './routes/UpitRoutes';
import RadnikRoute from './routes/RadniciRoutes';
import OdeljenjeRoute from './routes/OdeljenjaRoutes'
import MagacinRoute from './routes/MagaciniRoutes'
import ZahtevRoute from './routes/ZahteviRoutes'
import JavniPozivRoute from './routes/JavniPoziviRoutes'

createConnection().then(connection => {

    const app = express();


    //svaka fja od ovih vraca fju u sa parametrima (req, res, next);
    //app.use() se koristi za definisanje middleware-a kao callback fje

    app.use(bodyParser.json()); //kad dobijemo body iz requesta to je json ali je on string i on ga isparsira
    //da ne bude json nego objekat


    app.use(cors()); // za bezbednost, ako se ne stavi javljaju se neki problemi, browseri ne dozvoljavaju neko
    //ponasanje pa cors to dozvoljava
     



     app.use("/banka",BankaRoute);
     app.use("/upit",UpitRoute);
     app.use("/radnik",RadnikRoute);
     app.use("/odeljenje",OdeljenjeRoute);
     app.use("/zahtev",ZahtevRoute);
     app.use("/magacin",MagacinRoute);
     app.use("/javnipoziv", JavniPozivRoute);


    


    app.listen(process.env.PORT || 5000, ()=>console.log("app is listening"));
    //process.env.port || 3000 prvo proverimo enverioment procesa da vidimo na kom se portu izvrsava jer to
    //vrv nece biti port 300
    //()=>console.log("app is listening") kad se to izvrsi tj kad "nadje" port on ce ispisati ovo da 
    //znamo da je sve u redu
})