import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import TabelaBanka from './TabelaBanka'
import FormaBanka from "./FormaBanka";
import Banka from "../model/Banka";
import axios from "axios";

export default function BankaStrana() {

const [banke, setBanke] = React.useState<Banka[]>([])
const[selBanka, setBanka]=React.useState<Banka|undefined>(undefined);

const dodajBanku = (naziv:string) =>{

axios.post('http://localhost:5000/banka',{

naziv:naziv

}).then(value=>{

  if(value.data.greska){
    alert(value.data.greska);
  }else
  setBanke([...banke,( new Banka(value.data.id, value.data.naziv))])
  
})
}

const izmeniBanku = (naziv:string) =>{

  axios.patch('http://localhost:5000/banka/' + selBanka!.getId(), {
    naziv: naziv,
    
}).then(value => {
    let noviNiz = [...banke];
    let index = noviNiz.findIndex((k1) => k1.getId() === value.data.id); //find indeks prime fju koja kao parametar prima element i vraca boolean
    if (index === -1) {
        return;
    }
    noviNiz[index] = new Banka(value.data.id, value.data.naziv);
    setBanke(noviNiz);
    setBanka(undefined);
})

}
const obrisiBanku = () =>{

  axios.delete('http://localhost:5000/banka/'+selBanka!.getId()).then(value=>{

  setBanke(banke.filter((b1) => b1.getId() !== selBanka!.getId()))
  setBanka(undefined);

  })

}

React.useEffect(()=>{ //popunjava tabelu bankama preko propsa u body-ju tabele

  axios.get('http://localhost:5000/banka').then(value=>{

  const k1 = value.data.map((element)=>{
    return new Banka(element.id, element.naziv);
  })
  setBanke(k1);

  })

},[]);

  return (
    <Grid>
      <Grid.Row columns={16}>
          <TabelaBanka banke={banke} banka={selBanka} setSelektovanaBanka = {setBanka} />
      </Grid.Row>
      <Grid.Row  columns={2} centered >
        
          <FormaBanka banka = {selBanka} dodaj= {dodajBanku} izmeni= {izmeniBanku} obrisi={obrisiBanku}/>
       
      </Grid.Row>
    </Grid>
  );
}
