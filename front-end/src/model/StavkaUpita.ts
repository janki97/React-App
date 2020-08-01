export default class StavkaUpita {
   
   private id: number;
   private naziv: string;
   private kolicina: number;
   private jedinicaMere: string;
   obrisana:boolean;
    
   constructor(id: number, naziv: string, kolicina: number, jedinicaMere: string) {
    
    this.id = id;
    this.naziv = naziv;
    this.kolicina = kolicina;
    this.jedinicaMere = jedinicaMere;
    this.obrisana = false;

}

  
public getId() {

    return this.id;
}

public setId(id: number) {

    this.id = id;

}


public getNaziv() {

    return this.naziv;
}

public setNaziv(naziv: string) {

    this.naziv = naziv;

}

public getKolicina() {

    return this.kolicina;
}

public setKolicina(kolicina: number) {

    this.kolicina = kolicina;

}


public getJedinicaMere() {

    return this.jedinicaMere;
}

public setJedinicaMere(jedinicaMere: string) {

    this.jedinicaMere = jedinicaMere;

}



  }
  