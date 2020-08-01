import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class JavniPoziv extends BaseEntity{

   // SifraJavnogPosla,NazivProjekta,VremeZavrsetkaRadova,RokDostave,RokPredajeDokumenata, kupacID
@PrimaryGeneratedColumn()
id:number
@Column()
nazivProjekta:string
@Column()
vremeZavrsetkaRadova:Date
@Column()
rokDostave:Date
@Column()
rokPredajeDokumenata:Date
@Column()
kupac:string


constructor(id: number, nazivProjekta: string, vremeZavrsetkaRadova: Date,
     rokDostave: Date, rokPredajeDokumenata: Date, kupac: string) {
    super();
    this.id = id;
    this.nazivProjekta = nazivProjekta;
    this.vremeZavrsetkaRadova = vremeZavrsetkaRadova;
    this.rokDostave = rokDostave;
    this.rokPredajeDokumenata = rokPredajeDokumenata;
    this.kupac = kupac;

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





public getVremeZavrsetkaRadova() {

    return this.vremeZavrsetkaRadova;
}

public setVremeZavrsetkaRadova(vremeZavrsetkaRadova: Date) {

    this.vremeZavrsetkaRadova = vremeZavrsetkaRadova;

}

public getRokDostave() {

    return this.rokDostave;
}

public setRokDostave(rokDostave: Date) {

    this.rokDostave =rokDostave;

}
public getRokPredajeDokumenata() {

    return this.rokPredajeDokumenata;
}

public setRokPredajeDokumenata(rokPredajeDokumenata:Date) {

    this.rokPredajeDokumenata = rokPredajeDokumenata;

}

public getKupac() {

    return this.kupac;
}

public setJedinicaMere(kupac: string) {

    this.kupac = kupac;

}




    
}