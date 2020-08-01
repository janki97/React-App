import React from "react";
import {
  Button,
  Modal,
  Table,
  Form,
  Grid,
  Dropdown,
  DropdownItemProps,
} from "semantic-ui-react";
import StavkaUpita from "../model/StavkaUpita";
import Upit from "../model/Upit";
import Radnik from "../model/Radnik";
import axios from "axios";
import Magacin from "../model/Magacin";
import Zahtev from "../model/Zahtev";
import Odeljenje from "../model/Odeljenje";
import JavniPoziv from "../model/JavniPoziv";

interface Props {
  upit?: Upit;
  open: boolean;
  close: () => void;
  onSave: (upit: Upit) => void;
}

function ModalIzmeni(props: Props) {
  const [stavka, setStavka] = React.useState<StavkaUpita | undefined>(undefined);
  const[stavke, setStavke] = React.useState<StavkaUpita[]>(props.upit?props.upit.getStavke():[]);
  const[datum,setDatum] = React.useState<Date|undefined>(props.upit?props.upit.getDatum():undefined)
  const[radnici, setRadnici] = React.useState<Radnik[]>([]);
  const[selRadnik, setSelRadnik]=React.useState<Radnik|undefined>(props.upit?props.upit.getRadnik():undefined);
  const[magacini, setMagacini] = React.useState<Magacin[]>([]);
  const[selMagacin, setSelMagacin] = React.useState<Magacin|undefined>(props.upit?props.upit.getMagacin():undefined);
  const[zahtevi, setZahtevi] = React.useState<Zahtev[]>([]);
  const[selZahtev, setSelZahtev] = React.useState<Zahtev|undefined>(props.upit?props.upit.getZahtev():undefined);
  const[selOdeljenje, setSelOdeljenje] = React.useState<Odeljenje|undefined>(props.upit?props.upit.getOdeljenje():undefined);
  const[odeljenja, setOdeljenja] = React.useState<Odeljenje[]>([]);
  const[javniPozivi, setJavniPozivi] = React.useState<JavniPoziv[]>([]);
  const[selJavniPoziv, setSelJavniPoziv] = React.useState<JavniPoziv|undefined>(props.upit?props.upit.getJavniPoziv():undefined);

  const [nazivStavke, setNazivStavke] = React.useState('');
  const [kolicinaStavke, setKolicinaStavke] = React.useState<number|undefined>(undefined);
  const [jedinicaMere, setJedinicaMere] = React.useState('');
 



  const selektuj = (s1: StavkaUpita) => () => {
    if (stavka?.getId() === s1.getId()) {
      setStavka(undefined);
    } else {
      setStavka(s1);
    }
  };



  React.useEffect(() => {
  
    axios.get('http://localhost:5000/radnik/').then(value => {
      let rd = (value.data.map(element => {
        return new Radnik(element.id, element.imePrezime,element.datumZasposlenja);
      }));
      setRadnici(rd);
    })
    axios.get('http://localhost:5000/magacin/').then(value => {
      let mg = (value.data.map(element => {
        return new Magacin(element.id,element.vrstaRobe);
      }));
      setMagacini(mg);
    })
    axios.get('http://localhost:5000/zahtev/').then(value => {
      let zah = (value.data.map(element => {
        return new Zahtev(element.id,element.opis,element.datum,element.podnosilac, new Radnik(element.potpisao.id,element.potpisao.imePrezime,element.potpisao.datumZaposlenja),new Radnik(element.primio.id,element.primio.imePrezime,element.primio.datumZaposlenja));
      }));
      setZahtevi(zah);
    })
    axios.get('http://localhost:5000/odeljenje/').then(value => {
      let od = (value.data.map(element => {
        return new Odeljenje(element.id,element.naziv);
      }));
      setOdeljenja(od);
    })
    axios.get('http://localhost:5000/javnipoziv/').then(value => {
      let jp = (value.data.map(element => {
        return new JavniPoziv(element.id, element.nazivProjekta);
      }));
      setJavniPozivi(jp);
    })
  }, []);

  React.useEffect(() => {
    setDatum(props.upit ? props.upit.getDatum() : undefined);
    setSelRadnik(props.upit ? props.upit.getRadnik() : undefined)
    setSelMagacin(props.upit ? props.upit.getMagacin() : undefined);
    setSelOdeljenje(props.upit ? props.upit.getOdeljenje() : undefined)
    setSelJavniPoziv(props.upit ? props.upit.getJavniPoziv() : undefined)
    setSelZahtev(props.upit ? props.upit.getZahtev() : undefined)
    setStavke(props.upit ? props.upit.getStavke() : []);
  }, [props.upit]);

  React.useEffect(() => {
    setNazivStavke(stavka ? stavka.getNaziv() : '');
    setKolicinaStavke(stavka ? stavka.getKolicina() : 0);
    setJedinicaMere(stavka ? stavka.getJedinicaMere() : '')
  }, [stavka])







  return (
    <Modal size="large" open={props.open} onClose={props.close}>
      <Modal.Header>Upit</Modal.Header>
      <Modal.Content>
        <Grid columns="16">
          <Grid.Row>
            <Grid.Column width="3">
              <Form>
                <Form.Input
                  type="date"
                  label="Datum"
                  value={datum && datum.toISOString().substr(0, 10)}
                  onChange={(e) => {
                    e.preventDefault();
                    setDatum(new Date(e.target.value));
                  }}
                />
                <Dropdown
                  selection
                  fluid
                  placeholder='Radnik'
                  value={selRadnik && selRadnik.getId()}

                  options={radnici.map((element):DropdownItemProps=>{
                    return {
                      
                      value: element.getId(),
                      text: element.getImePrezime(),
                      onClick: () => {
                        setSelRadnik(element);
                        
                      }
                    }
                  })}
                />

               <Dropdown
                  selection
                  fluid
                  placeholder='Magacin'
                  value={selMagacin && selMagacin.getId()}

                  options={magacini.map((element):DropdownItemProps=>{
                    return {
                      value: element.getId(),
                      text: element.getVrstaRobe(),
                      onClick: () => {
                        setSelMagacin(element);
                      }
                    }
                  })}
                />  
               
            
               <Dropdown
                  selection
                 fluid
                  placeholder='Odeljenje'
                  value={selOdeljenje && selOdeljenje.getId()}

                  options={odeljenja.map((element):DropdownItemProps=>{
                    return {
                      value: element.getId(),
                      text: element.getNaziv(),
                      onClick: () => {
                        setSelOdeljenje(element);
                      }
                    }
                  })}
                />
               

               <Dropdown
                  selection
                 
                  placeholder='Javni poziv'
                  value={selJavniPoziv && selJavniPoziv.getId()}

                  options={javniPozivi.map((element):DropdownItemProps=>{
                    return {
                      value: element.getId(),
                      text: element.getNazivProjekta(),
                      onClick: () => {
                        setSelJavniPoziv(element);
                      }
                    }
                  })}
                />

               <Dropdown
                  selection
                  labeled
                 
                  placeholder='Zahtev'
                  value={selZahtev && selZahtev.getId()}

                  options={zahtevi.map((element):DropdownItemProps=>{
                    return {
                      value: element.getId(),
                      text: element.getId(),
                      onClick: () => {
                        setSelZahtev(element);
                      }
                    }
                  })}
                /> 
            
              </Form>
            </Grid.Column>
            <Grid.Column width="7">
              <Table columns="4" celled>
                <Table.Header>
                  <Table.HeaderCell>Id</Table.HeaderCell>
                  <Table.HeaderCell>Naziv</Table.HeaderCell>
                  <Table.HeaderCell>Kolicina</Table.HeaderCell>
                  <Table.HeaderCell>Jedinica mere</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                {stavke.filter(element => !element.obrisana).map((element, index) => {
                    return (<Table.Row key={index} active={element === stavka} onClick={() => {
                      if (element === stavka) {
                        setStavka(undefined)
                      } else {
                        setStavka(element)
                      }
                    }}>
                      <Table.Cell>{element.getId()}</Table.Cell>
                      <Table.Cell>{element.getNaziv()}</Table.Cell>
                      <Table.Cell>{element.getKolicina()}</Table.Cell>
                      <Table.Cell>{element.getJedinicaMere()}</Table.Cell>
                    </Table.Row>)
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            {<Grid.Column width="6">
                <Form size="small" inline>
                  <Form.Input
                    label="naziv"
                    placeholder="naziv"
                    value={nazivStavke}
                    onChange={(e) => {
                     setNazivStavke(e.target.value);
                    }}
                  />
                  <Form.Input
                    label="kolicina"
                    placeholder="kolicina"
                    type="number"
                    value={kolicinaStavke}
                    onChange={(e) => {
                     setKolicinaStavke(parseInt(e.target.value))
                    }}
                  />
                  <Form.Input
                    label="jed. mere"
                    placeholder="jed. mere"
                    value={jedinicaMere}
                    onChange={(e) => {
                    setJedinicaMere(e.target.value);
                    }}
                  />
                  <Button
                    size="tiny"
                    onClick={(e) => {
                      e.preventDefault();
                      const novaStavka = new StavkaUpita(-1, nazivStavke, kolicinaStavke!, jedinicaMere);
                      setStavke([...stavke, novaStavka]);
                      setNazivStavke('');
                      setKolicinaStavke(undefined);
                      setJedinicaMere('')
                    }}
                  >
                    Dodaj stavku
                  </Button>
                  <Button
                    disabled={!stavka}
                    size="tiny"
                    onClick={(e) => {
                      e.preventDefault();
                      let noveStavke = [...stavke];
                      let index = noveStavke.findIndex(element => element === stavka);
                      setStavka(prev => {
                        let nova = new StavkaUpita(prev!.getId(), nazivStavke, kolicinaStavke!, jedinicaMere)
                        noveStavke[index] = nova;
                        console.log(noveStavke);
                        setStavke(noveStavke);
                        return nova;
                      });
    
    
                    }}
                  >
                    Izmeni stavku
                  </Button>

                  <Button
                 
                   disabled={!stavka}
                    size="tiny"
                    onClick={(e) => {
                      e.preventDefault();
                      if (stavka!.getId() == -1) {
                        setStavke(stavke.filter(element => element !== stavka));
                      } else {
                        setStavke(stavke.map(element => {
                          if (element === stavka) {
                            const el1 = new StavkaUpita(element.getId(), element.getNaziv(), element.getKolicina(), element.getJedinicaMere());
                            el1.obrisana = true;
                            return el1;
                          }
                          return element;
                        }))
                      }
                      setStavka(undefined);
    
                    }}
                  >
                    Obrisi stavku
                  </Button>
                </Form>
              </Grid.Column>
            }
          </Grid.Row>
          <Grid.Row stretched>
            <Button
              floated="right"
              onClick={(e) => {  
                if(selRadnik === undefined){
                alert("niste uneli radnika");
        
                }
                else if(selMagacin === undefined){
                  alert("niste uneli magacin");
        
                }
                else if(selOdeljenje === undefined){
                  alert("niste uneli odeljenje");
        
                }
                 else if(selJavniPoziv === undefined){
                  alert("niste uneli javni poziv");
        
                } 
                 else if(selZahtev === undefined){
                  alert("niste uneli zahtev");
        
                }
                else if(datum === undefined){
                  alert("niste uneli datum");
        
                }
                else{
                props.onSave(new Upit(props.upit ? props.upit.getId() : -1, datum!,selRadnik!,selMagacin!,selZahtev!,selJavniPoziv!,selOdeljenje!,stavke));
                }
              }}
            >
              Sacuvaj
            </Button>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}

export default ModalIzmeni;
