import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany, OneToOne, JoinColumn } from 'typeorm';


@Entity()
export class Odeljenje extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    naziv: string;
  


    constructor(id: number, naziv: string) {
        super();
        this.id = id;
       this.naziv = naziv
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