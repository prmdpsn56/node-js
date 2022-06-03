import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column({default: 2022})
    registeredIn: string;
}