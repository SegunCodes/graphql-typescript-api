import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@Entity()
@ObjectType()
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number

    @CreateDateColumn()
    @Field(() => String)
    created: Date

    @UpdateDateColumn()
    @Field(() => String)
    updated: Date

    @Column()
    @Field(() => String)
    title: string

    @Column()
    @Field(() => Boolean)
    isComplete: boolean
}