import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

@Entity()
export class Stocks extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({})
    code: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    time: string;

    @Column({default: 0})
    price: string;
}