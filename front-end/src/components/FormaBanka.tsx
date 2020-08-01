import React from "react";
import { Form, Button, GridRow, Popup, Header } from "semantic-ui-react";
import Banka from "../model/Banka";
import ModalUpozorenje from "./ModalUpozorenje";
import { Grid, Container } from 'semantic-ui-react';

interface Props {
  banka?: Banka;
  dodaj: (naziv: string) => void,
  izmeni:(naziv:string)=>void,
  obrisi:()=>void
}

function FormaBanka(props: Props) {
  

  let [naziv, setNaziv] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  

  const otvori = () => {
    setIsModalOpen(true);
  };

  const zatvori = () => {
    setIsModalOpen(false);
  };

  
  React.useEffect(() => {
    if (props.banka) {
      setNaziv(props.banka.getNaziv());
    }
    else{
      setNaziv('');
    }
  }, [props.banka]);

  return (
    
    <Form className="forma" size="big">
      
      <Form.Input
        label="NAZIV"
        placeholder="Naziv"
        value={naziv}
        
        onChange={(e) => {
          
          e.preventDefault();
          setNaziv(e.target.value);
          
        }}
      ></Form.Input>
 
      <Button 
      color = "purple"
      onClick={(e) => {
          e.preventDefault();
          if(naziv.length >= 2){
          props.dodaj(naziv);
          
          }
          else{
          setNaziv("");
          otvori();
          }
        }}
      
      >
        Dodaj
      </Button>
      <Button 
      color = "purple"
      disabled={props.banka === undefined}
      onClick = {(e)=>{
e.preventDefault();

if(naziv.length >= 2){
  props.izmeni(naziv);;
  
  }
  else{
  setNaziv("");
  otvori();
  }



      }}>
        Izmeni
        </Button>
      <Button 
      color = "purple"
      disabled={props.banka === undefined}
      onClick = {(e)=>{
        e.preventDefault();

        props.obrisi();
        
              }}>
        Obrisi</Button>

        <ModalUpozorenje open = {isModalOpen} close = {zatvori} poruka = "Naziv mora sadrzati makar 2 slova" />
       
    </Form>
 
  );
}

export default FormaBanka;
