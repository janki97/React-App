import Radnik from "./Radnik";

export default class Zahtev {

  private id: number;
  private opis: string;
  private datum: Date;
  private podnosilac: string;
  private potpisao: Radnik;
  private primio: Radnik;

  constructor(
    id: number,
    opis: string,
    datum: Date,
    podnosilac: string,
    potpisao: Radnik,
    primio: Radnik
  ) {
   
    this.id = id;
    this.datum = datum;
    this.opis = opis;
    this.podnosilac = podnosilac;
    this.potpisao = potpisao;
    this.primio = primio;
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
    this.datum = datum;
  }

  public getOpis() {
    return this.opis;
  }

  public setOpis(opis: string) {
    this.opis = opis;
  }

  public getPodnosilac() {
    return this.podnosilac;
  }

  public setPodnosilac(podnosilac: string) {
    this.podnosilac = podnosilac;
  }
  public getPrimio() {
    return this.podnosilac;
  }

  public setPrimio(primio: Radnik) {
    this.primio = primio;
  }
  public getPotpisao() {
    return this.potpisao;
  }

  public setPotpisao(potpisao: Radnik) {
    this.potpisao = potpisao;
  }
}
