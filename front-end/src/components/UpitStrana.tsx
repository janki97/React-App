import axios from 'axios';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import JavniPoziv from '../model/JavniPoziv';
import Magacin from '../model/Magacin';
import Odeljenje from '../model/Odeljenje';
import Radnik from '../model/Radnik';
import StavkaUpita from '../model/StavkaUpita';
import Upit from '../model/Upit';
import Zahtev from '../model/Zahtev';
import TabelaUpit from './TabelaUpit';


export default function UpitStrana() {

  const [upiti, setUpiti] = React.useState<Upit[]>([]);
  const [selUpit, setUpit] = React.useState<Upit | undefined>(undefined);

  const azurirajUpit = (upit: Upit) => {
    console.log('pre azuriranja');
    axios.patch(`http://localhost:5000/upit/` + upit.getId(), upit).then(value => {
      console.log('azurirano');
      console.log(value.data);
      setUpiti(upiti.map(element => {
        if (element.getId() !== value.data.id) {
          return element;
        } else {
          
          return napraviUpit(value.data);
        }
      }))
    }).catch(err => console.log({ greska: err }))
  }



  const dodajUpit = (upit: Upit) => {
    console.log('insert');
    axios.post('http://localhost:5000/upit/', upit).then(value => {
      console.log('ubaceno');
      console.log(value.data);
    
       
      setUpiti([...upiti, napraviUpit(value.data)]);
        
    })
  }

  const napraviUpit = (element: any): Upit => {
    let stavkeUpita = element.stavke.map((stavka) => {

      const st = new StavkaUpita(stavka.id, stavka.naziv, stavka.kolicina, stavka.jedinicaMere);
      st.obrisana = false;
      return st;
    }) as StavkaUpita[];

    
 const u1: Upit = new Upit(element.id, new Date(element.datum),
      (new Radnik(element.radnik.id, element.radnik.imePrezime, element.radnik.datumZaposlenja)),
      (new Magacin(element.magacin.id, element.magacin.vrstaRobe)),
      (new Zahtev(element.zahtev.id, element.zahtev.opis, element.zahtev.datum, element.zahtev.podnosilac, element.zahtev.potpisao, element.zahtev.primio)),
      (new JavniPoziv(element.javniPoziv.id, element.javniPoziv.nazivProjekta)),
      (new Odeljenje(element.odeljenje.id, element.odeljenje.naziv)), stavkeUpita);
    console.log({ u1: u1 });
    return u1;
  }


  const obrisiUpit = () => {

    axios.delete('http://localhost:5000/upit/' + selUpit!.getId()).then(value => {

      setUpiti(upiti.filter((b1) => b1.getId() !== selUpit!.getId()))
      setUpit(undefined);

    })

  }

  React.useEffect(() => {

    axios.get('http://localhost:5000/upit').then(value => {
      console.log(value.data);
      const u1 = value.data.map((element) => {
        const stavkeUpita = element.stavke.map((stavka) => {

          return new StavkaUpita(stavka.id, stavka.naziv, stavka.kolicina, stavka.jedinicaMere)
        }) as StavkaUpita[];

        return new Upit(element.id, new Date(element.datum),
          (new Radnik(element.radnik.id, element.radnik.imePrezime, element.radnik.datumZaposlenja)),
          (new Magacin(element.magacin.id, element.magacin.vrstaRobe)),
          (new Zahtev(element.zahtev.id, element.zahtev.opis, element.zahtev.datum, element.zahtev.podnosilac, element.zahtev.potpisao, element.zahtev.primio)),
          (new JavniPoziv(element.javniPoziv.id, element.javniPoziv.nazivProjekta)),
          (new Odeljenje(element.odeljenje.id, element.odeljenje.naziv)), stavkeUpita);


      })
      setUpiti(u1);



    })


  }, []);

  return (
    <Grid>
      <Grid.Row>
        <TabelaUpit
          onSave={dodajUpit}
          onUpdate={azurirajUpit}
          obrisi={obrisiUpit}
          upiti={upiti}
          setSelektovaniUpit={setUpit}
          upit={selUpit}
          stavke={selUpit?.getStavke()}
        />
      </Grid.Row>
    </Grid>
  );
}


