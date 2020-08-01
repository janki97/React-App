import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Magacin extends BaseEntity{

@PrimaryGeneratedColumn()
id:number
@Column()
vrstaRobe:string


constructor(id:number, vrstaRobe:string){
super();

this.id = id;
this.vrstaRobe = vrstaRobe

}

public getId() {

    return this.id;
}

public setId(id: number) {

    this.id = id;

}


public getVrstaRobe() {

    return this.vrstaRobe;
}

public setVrstaRobe(vrstaRobe: string) {

    this.vrstaRobe = vrstaRobe;

}

}