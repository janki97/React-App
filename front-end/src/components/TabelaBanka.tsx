import React from "react";
import { Table, Grid} from "semantic-ui-react";
import Banka from "../model/Banka";

interface Props {
  banke: Banka[];
  banka?: Banka;
  setSelektovanaBanka: (banka?: Banka) => void;
}

export default function TabelaBanka(props: Props) {
  const selektuj = (b1: Banka) => () => {
    if (props.banka === b1) {
      props.setSelektovanaBanka(undefined); //props ne moze da se menja preko props.selBanka = b1 kao ni stanje, pa mora da se uvede funkcija
    } else {
      props.setSelektovanaBanka(b1);
    }
  };

  return (
    
      <Table inverted  celled>
       
          <Table.Header fullWidth>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Naziv</Table.HeaderCell>
          </Table.Header>
       
        <Table.Body>
          {props.banke.map((b1) => {
            return (
              <Table.Row
                key={b1.getId()}
                active={b1 === props.banka}
                onClick={selektuj(b1)}
              >
                <Table.Cell>{b1.getId()}</Table.Cell>
                <Table.Cell>{b1.getNaziv()}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    
  );
}
