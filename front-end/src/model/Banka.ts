export default class Banka {

     private id:number;      
     private naziv:string;

  public  constructor(id:number,naziv:string) {
        this.id=id;
        this.naziv = naziv;
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
     
}

