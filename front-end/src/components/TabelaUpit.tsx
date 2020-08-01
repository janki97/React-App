import React, { useState } from "react";
import { Button, Grid, Table, GridRow } from "semantic-ui-react";
import StavkaUpita from "../model/StavkaUpita";
import Upit from "../model/Upit";
import ModalIzmeni from "./ModalIzmeni";
import '../App.css';

interface Props {
  upiti: Upit[];
  upit?: Upit;
  setSelektovaniUpit: (upit?: Upit) => void;
  obrisi: () => void;
  stavke: StavkaUpita[] | undefined;
  onSave: (upit: Upit) => void;
  onUpdate:(upit:Upit)=> void;
}


export default function TabelaUpit(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInsert, setIsInsert] = useState(true);

  const otvori = () => {
    setIsModalOpen(true);
  };

  const zatvori = () => {
    setIsModalOpen(false);
  };

  const selektuj = (u1: Upit) => () => {
    if (props.upit === u1) {
      props.setSelektovaniUpit(undefined);
    } else {
      props.setSelektovaniUpit(u1);
    }
  };
  console.log(props.upiti);
  
  return (
    <Grid>
      <Grid.Row>
      <Table  className = "tabelaUpit" inverted columns="7" celled>
        <Table.Header  fullWidth>
          <Table.HeaderCell >Id</Table.HeaderCell>
          <Table.HeaderCell>Datum</Table.HeaderCell>
          <Table.HeaderCell>Radnik</Table.HeaderCell>
          <Table.HeaderCell>Magacin</Table.HeaderCell>
          <Table.HeaderCell>Zahtev</Table.HeaderCell>
          <Table.HeaderCell>Javni poziv</Table.HeaderCell>
          <Table.HeaderCell>Odeljenje</Table.HeaderCell>
        </Table.Header>

        <Table.Body >
          {props.upiti.map((u1) => {
            return (
              <Table.Row 
                active={u1 && u1 === props.upit}
                onClick={selektuj(u1)}
              >
                <Table.Cell>{u1.getId()}</Table.Cell>
                <Table.Cell>{u1.getDatum()?.toLocaleDateString()}</Table.Cell>
                <Table.Cell>{u1.getRadnik().getImePrezime()}</Table.Cell>
                <Table.Cell>{u1.getMagacin().getVrstaRobe()}</Table.Cell>
                <Table.Cell>{u1.getZahtev().getId()}</Table.Cell>
                <Table.Cell>{u1.getJavniPoziv().getId()}</Table.Cell>
                <Table.Cell>{u1.getOdeljenje().getNaziv()}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      </Grid.Row>
<Grid.Row  centered>
      <Button
      color = "purple"
        disabled={props.upit === undefined}
        onClick={(e) => {
          e.preventDefault();
          props.obrisi();
        }}
      >
        Obrisi
      </Button>
      <Button color = "purple"  disabled={props.upit === undefined} onClick={(e)=>{
        e.preventDefault();
        setIsInsert(false);
        otvori();
      
      }}>
        Izmeni
      </Button>
      <Button  color = "purple"onClick={(e)=>{
        e.preventDefault();
Promise.resolve(props.setSelektovaniUpit(undefined)).then(()=>{
  setIsInsert(true);
otvori();

})
      }}>Dodaj</Button>
      <ModalIzmeni
        onSave={isInsert? props.onSave : props.onUpdate}
        open={isModalOpen}
        close={zatvori}
        upit={props.upit}
      />
      </Grid.Row>
    </Grid>
  );
}

