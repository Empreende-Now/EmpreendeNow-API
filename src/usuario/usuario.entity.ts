import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryColumn()
    CPF: string;

    @Column()
    nome:string

    @Column({unique:true})
    email:string

    @Column()
    senha: string

}
