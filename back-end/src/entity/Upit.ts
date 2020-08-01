import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany } from 'typeorm';
import { Radnik } from "./Radnik";
import { StavkaUpita } from './StavkeUpita';
import { Magacin } from './Magacin';
import { Zahtev } from './Zahtev';
import { JavniPoziv } from './JavniPoziv';
import { Odeljenje } from './Odeljenje';

@Entity()
export class Upit extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    datum: Date;
    @ManyToOne(type => Radnik, { eager: true })
    radnik: Radnik;
    @ManyToOne(type => Magacin, { eager: true })
    magacin: Magacin
    @ManyToOne(type => Zahtev, { eager: true })
    zahtev: Zahtev
    @ManyToOne(type => JavniPoziv, { eager: true })
    javniPoziv: JavniPoziv
    @ManyToOne(type => Odeljenje, { eager: true })
    odeljenje: Odeljenje
    @OneToMany(type => StavkaUpita, stavke => stavke.upit, { eager: true, onDelete: 'CASCADE' },)
    stavke: StavkaUpita[];



    constructor(id: number | undefined, datum: Date, radnik: Radnik, stavke: StavkaUpita[], magacin: Magacin, zahtev: Zahtev,
        javniPoziv: JavniPoziv, odeljenje: Odeljenje) {
        super(); // od base entity-ja konstruktor
        this.id = id;
        this.datum = datum;
        this.radnik = radnik;
        this.stavke = stavke;
        this.odeljenje = odeljenje;
        this.magacin = magacin;
        this.zahtev = zahtev;
        this.javniPoziv = javniPoziv;
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


    public getRadnik() {

        return this.radnik;
    }

    public setRadnik(radnik: Radnik) {

        this.radnik = radnik;
    }


    public getMagacin() {

        return this.magacin;
    }

    public setMagacin(magacin: Magacin) {

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

    public setZahtev(zahtev: Zahtev) {

        this.zahtev = zahtev;
    }
    public getJavniPoziv() {

        return this.javniPoziv;
    }

    public setJavniPoziv(javniPoziv: JavniPoziv) {

        this.javniPoziv = javniPoziv;
    }
    public getStavke() {

        return this.stavke;
    }

    public setStavke(stavke: StavkaUpita[]) {

        this.stavke = stavke;
    }

}