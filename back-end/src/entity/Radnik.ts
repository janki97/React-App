import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';


@Entity()
export class Radnik extends BaseEntity {

    @PrimaryGeneratedColumn()
     id: number;
    @Column()
     imePrezime: string;
    @Column()
     datumZaposlenja:Date;

    constructor(id: number, imePrezime: string, datumZaposlenja:Date) {
        super();
        this.id = id;
        this.imePrezime = imePrezime;
        this.datumZaposlenja = datumZaposlenja;
    }

    public getId() {

        return this.id;
    }

    public setId(id: number) {

        this.id = id;
    }


    public getImePrezime() {

        return this.imePrezime;
    }

    public setImePrezime(imePrezime: string) {

        this.imePrezime= imePrezime;
    }

    public getDatumZaposlenja() {

        return this.datumZaposlenja;
    }

    public setDatumZaposlenja(datumZaposlenja: Date) {

        this.datumZaposlenja = datumZaposlenja;
    }

}