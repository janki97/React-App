export default class JavniPoziv {

private id: number;
private nazivProjekta: string;

  constructor(
    id: number,
    nazivProjekta: string,
   
  ) {
   
    this.id = id;
    this.nazivProjekta = nazivProjekta;
 
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getNazivProjekta() {
    return this.nazivProjekta;
  }

  public setNazivProjekta(nazivProjekta: string) {
    this.nazivProjekta = nazivProjekta;
  }

  
}
