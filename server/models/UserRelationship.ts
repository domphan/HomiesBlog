import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '.';

@Entity()
export class UserRelationship {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(type => User, user => user.id)
    public me: User;

    @OneToOne(type => User)
    @JoinColumn()
    public them: User;

    // block, friend, request, default
    @Column()
    public type: string
}