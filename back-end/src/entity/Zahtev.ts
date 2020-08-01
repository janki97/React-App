import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Radnik } from "./Radnik";

//Zahtev(brojZahteva,Opis,Datum,Podnosilac,Potpisao,
@Entity()
export class Zahtev extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number
    @Column()
    opis:string
    @Column()
    datum:Date
    @Column()
    podnosilac:string
    @ManyToOne(type=>Radnik, {eager:true})
    potpisao:Radnik
    @ManyToOne(type=>Radnik, {eager:true})
    primio:Radnik
    

    
    constructor(id: number, opis: string, datum:Date,podnosilac:string,potpisao:Radnik, primio:Radnik) {
        super(); // od base entity-ja konstruktor
        this.id = id;
        this.datum = datum;
        this.opis=opis;
        this.podnosilac=podnosilac;
        this.potpisao = potpisao;
        this.primio =primio;
       
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

    public getOpis() {

        return this.opis;
    }

    public setOpis(opis: string) {

        this.opis= opis;
    }

    public getPodnosilac() {

        return this.podnosilac;
    }

    public setPodnosilac(podnosilac:string) {

        this.podnosilac = podnosilac;
    }
    public getPrimio() {

        return this.podnosilac;
    }

    public setPrimio(primio:Radnik) {

        this.primio = primio;
    }  
    public getPotpisao() {

        return this.potpisao;
    }

    public setPotpisao(potpisao:Radnik) {

        this.potpisao = potpisao;
    }

}