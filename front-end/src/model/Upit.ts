import StavkaUpita from "./StavkaUpita";
import Radnik from "./Radnik";
import Zahtev from "./Zahtev";
import Magacin from "./Magacin";
import JavniPoziv from "./JavniPoziv";
import Odeljenje from "./Odeljenje";

export default class Upit {
  private id: number;
  private datum: Date|undefined;
  private radnik: Radnik
  private zahtev: Zahtev;
  private magacin: Magacin;
  private javniPoziv: JavniPoziv;
  private odeljenje: Odeljenje;
  private stavke:StavkaUpita[];

  constructor(id: number, datum: Date, radnik:Radnik,magacin:Magacin, zahtev:Zahtev,
    javniPoziv:JavniPoziv, odeljenje:Odeljenje, stavke:StavkaUpita[]) {
 
    this.id = id;
    this.datum = datum;
    this.radnik=radnik;
    this.odeljenje = odeljenje;
    this.magacin = magacin;
    this.zahtev = zahtev;
    this.javniPoziv = javniPoziv;
    this.stavke = stavke;
}

public getId() {

    return this.id;
}

public setId(id: number) {

    this.id = id;
}

public getDatum() {

    return this.datum;
}

public setDatum(datum: Date) {

    this.datum= datum;
}


public getRadnik() {

    return this.radnik;
}

public setRadnik(radnik: Radnik) {

    this.radnik= radnik;
}


public getMagacin() {

    return this.magacin;
}

public setMagacin(magacin:Magacin) {

    this.magacin = magacin;
}


public getOdeljenje() {

    return this.odeljenje;
}

public setOdeljenje(odeljenje: Odeljenje) {

    this.odeljenje = odeljenje;
}


public getZahtev() {

    return this.zahtev;
}

public setZahtev(zahtev:Zahtev) {

   this.zahtev = zahtev;
}
public getJavniPoziv() {

    return this.javniPoziv;
}

public setJavniPoziv(javniPoziv:JavniPoziv) {

    this.javniPoziv = javniPoziv;
}
public getStavke() {

    return this.stavke;
}

public setStavke(stavke: StavkaUpita[]) {

    this.stavke = stavke;
}

}
