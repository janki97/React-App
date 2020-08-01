import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Upit } from './Upit';


@Entity()
export class StavkaUpita extends BaseEntity {


    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    naziv: string;
    @Column()
    kolicina: number;
    @Column()
    jedinicaMere: string;
    @ManyToOne(type => Upit, upit => upit.stavke, { eager: false, primary: true, onDelete: "CASCADE" })
    upit?: Upit;

    constructor(id: number | undefined, naziv: string, kolicina: number, jedinicaMere: string, upit: Upit | undefined) {
        super();
        this.id = id;
        this.naziv = naziv;
        this.kolicina = kolicina;
        this.upit = upit;
        this.jedinicaMere = jedinicaMere;


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





    public getJedinicaMere() {

        return this.jedinicaMere;
    }

    public setJedinicaMere(jedinicaMere: string) {

        this.jedinicaMere = jedinicaMere;

    }


    public getUpit() {

        return this.upit;
    }

    public setUpit(upit?: Upit) {

        this.upit = upit;

    }

}